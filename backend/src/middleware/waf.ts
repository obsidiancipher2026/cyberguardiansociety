import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { buildErrorResponse } from '../utils/helpers';

interface SuspiciousEntry {
  score: number;
  lastSeen: Date;
  blocked: boolean;
}

export const suspiciousIPs = new Map<string, SuspiciousEntry>();
const wafCleanupInterval = setInterval(cleanupSuspiciousIPs, 300000);

const SQL_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|FETCH|DECLARE|TRUNCATE)\b)/i,
  /(--|;|\/\*|\*\/|xp_|sp_)/i,
  /(\bOR\b\s+\d+\s*=\s*\d+)/i,
  /(\bAND\b\s+\d+\s*=\s*\d+)/i,
  /('\s*(OR|AND)\s+')/i,
  /(CHAR\(|CONCAT\(|0x[0-9a-f]+)/i,
];

const XSS_PATTERNS = [
  /<script[\s>]/i,
  /javascript:/i,
  /on(error|load|click|mouseover|focus|blur|submit|change)\s*=/i,
  /<iframe[\s>]/i,
  /<object[\s>]/i,
  /<embed[\s>]/i,
  /<form[\s>]/i,
  /expression\(/i,
  /data:text\/html/i,
  /vbscript:/i,
];

const PATH_TRAVERSAL_PATTERNS = [
  /\.\.\//,
  /\.\.\\/,
  /\/etc\/passwd/i,
  /\/proc\//i,
  /\/sys\//i,
  /\/var\/log/i,
  /\/windows\/system32/i,
];

const COMMAND_INJECTION_PATTERNS = [
  /[;|`$]/,
  /\$\(/,
  /\$\{/,
  /\|\|/,
];

const SCANNER_PATTERNS = [
  /nikto/i,
  /sqlmap/i,
  /\bnmap\b/i,
  /masscan/i,
  /dirbuster/i,
  /gobuster/i,
  /wfuzz/i,
  /burpsuite/i,
  /owasp/i,
  /metasploit/i,
];

const SSRF_PATTERNS = [
  /127\.0\.0\.1/,
  /localhost/i,
  /169\.254\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /0\.0\.0\.0/,
];

function getSeverity(patternType: string): 'low' | 'medium' | 'high' | 'critical' {
  const severityMap: Record<string, 'low' | 'medium' | 'high' | 'critical'> = {
    sql: 'critical',
    xss: 'high',
    path: 'high',
    command: 'critical',
    scanner: 'medium',
    ssrf: 'critical',
  };
  return severityMap[patternType] || 'low';
}

function calculateDelay(score: number): number {
  if (score >= 30) return 10000;
  if (score >= 15) return 5000;
  if (score >= 5) return 3000;
  return 0;
}

function getScoreIncrement(severity: 'low' | 'medium' | 'high' | 'critical'): number {
  const increments = { low: 1, medium: 3, high: 5, critical: 10 };
  return increments[severity];
}

function updateSuspiciousScore(ip: string, severity: 'low' | 'medium' | 'high' | 'critical'): SuspiciousEntry {
  const existing = suspiciousIPs.get(ip);
  const increment = getScoreIncrement(severity);
  const now = new Date();

  if (existing) {
    const timeSinceLastSeen = now.getTime() - existing.lastSeen.getTime();
    if (timeSinceLastSeen > 60000) {
      existing.score = Math.max(0, existing.score - 1);
    }
    existing.score += increment;
    existing.lastSeen = now;
    existing.blocked = existing.score > 30;
  } else {
    suspiciousIPs.set(ip, { score: increment, lastSeen: now, blocked: increment > 30 });
  }

  return suspiciousIPs.get(ip)!;
}

function detectPatterns(value: string): Array<{ type: string; pattern: string }> {
  const detections: Array<{ type: string; pattern: string }> = [];

  for (const pattern of SQL_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'sql', pattern: pattern.source });
      break;
    }
  }

  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'xss', pattern: pattern.source });
      break;
    }
  }

  for (const pattern of PATH_TRAVERSAL_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'path', pattern: pattern.source });
      break;
    }
  }

  for (const pattern of COMMAND_INJECTION_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'command', pattern: pattern.source });
      break;
    }
  }

  for (const pattern of SCANNER_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'scanner', pattern: pattern.source });
      break;
    }
  }

  for (const pattern of SSRF_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'ssrf', pattern: pattern.source });
      break;
    }
  }

  return detections;
}

function detectScannerPatterns(value: string): Array<{ type: string; pattern: string }> {
  const detections: Array<{ type: string; pattern: string }> = [];

  for (const pattern of SCANNER_PATTERNS) {
    if (pattern.test(value)) {
      detections.push({ type: 'scanner', pattern: pattern.source });
      break;
    }
  }

  return detections;
}

function extractBodyStrings(obj: any): string {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(extractBodyStrings).join(' ');
  if (obj && typeof obj === 'object') {
    return Object.values(obj).map(extractBodyStrings).join(' ');
  }
  return '';
}

const ADMIN_API_PREFIX = '/api/admin';

export function wafMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const entry = suspiciousIPs.get(ip);

  // Soft-block: if score > 30, apply a delay but still allow through
  // Hard-block: if score > 50, block entirely
  if (entry && entry.score > 50) {
    logger.warn(`WAF: Blocked request from ${ip} (score: ${entry.score})`);
    res.status(429).json(buildErrorResponse('Too many suspicious requests. Try again later.'));
    return;
  }

  // Skip WAF checks for admin API routes to prevent false positives on CRUD operations
  if (req.url.startsWith(ADMIN_API_PREFIX)) {
    next();
    return;
  }

  const allDetections: Array<{ type: string; pattern: string }> = [];

  const contentString = `${req.url} ${JSON.stringify(req.query)} ${extractBodyStrings(req.body)}`;
  const contentDetections = detectPatterns(contentString);
  allDetections.push(...contentDetections);

  const userAgent = req.headers['user-agent'] || '';
  if (userAgent) {
    const scannerDetections = detectScannerPatterns(userAgent);
    allDetections.push(...scannerDetections);
  }

  if (allDetections.length > 0) {
    const maxSeverity = allDetections.reduce((max, d) => {
      const sev = getSeverity(d.type);
      const order = { critical: 4, high: 3, medium: 2, low: 1 };
      return order[sev] > order[max] ? sev : max;
    }, 'low' as 'low' | 'medium' | 'high' | 'critical');

    const updated = updateSuspiciousScore(ip, maxSeverity);

    logger.warn(`WAF: ${maxSeverity.toUpperCase()} threat detected from ${ip}: ${allDetections.map(d => d.type).join(', ')} | Path: ${req.url} | Score: ${updated.score}`);

    // Only block if accumulated score exceeds threshold (not on first detection)
    if (updated.score > 30 || entry?.blocked) {
      const delay = calculateDelay(updated.score);
      if (delay > 0) {
        setTimeout(() => {
          res.status(403).json(buildErrorResponse('Request blocked by security policy.'));
        }, delay);
        return;
      }
      res.status(403).json(buildErrorResponse('Request blocked by security policy.'));
      return;
    }
  }

  if (!userAgent || userAgent.length < 5) {
    const updated = updateSuspiciousScore(ip, 'low');
    if (updated.score > 15) {
      logger.warn(`WAF: Missing/short User-Agent from ${ip}, score: ${updated.score}`);
      res.status(403).json(buildErrorResponse('Request blocked by security policy.'));
      return;
    }
  }

  next();
}

export function cleanupSuspiciousIPs(): void {
  const now = Date.now();
  for (const [ip, entry] of suspiciousIPs.entries()) {
    if (now - entry.lastSeen.getTime() > 3600000) {
      suspiciousIPs.delete(ip);
    }
  }
}

export function getSuspiciousIPs(): Map<string, SuspiciousEntry> {
  return suspiciousIPs;
}

export function shutdownWafCleanup(): void {
  clearInterval(wafCleanupInterval);
}
