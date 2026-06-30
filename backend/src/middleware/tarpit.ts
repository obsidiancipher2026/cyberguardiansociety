import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface TarpitEntry {
  score: number;
  lastSeen: Date;
  blockedUntil: Date | null;
}

const tarpitMap = new Map<string, TarpitEntry>();

function getTarpitDelay(score: number): number {
  if (score >= 30) return 10000;
  if (score >= 15) return 5000;
  if (score >= 5) return 3000;
  return 0;
}

function incrementTarpitScore(ip: string, amount: number = 1): TarpitEntry {
  const existing = tarpitMap.get(ip);
  const now = new Date();

  if (existing) {
    const timeSinceLastSeen = now.getTime() - existing.lastSeen.getTime();
    if (timeSinceLastSeen > 120000) {
      existing.score = Math.max(0, existing.score - 2);
    }
    existing.score += amount;
    existing.lastSeen = now;

    if (existing.score > 30) {
      existing.blockedUntil = new Date(now.getTime() + 15 * 60 * 1000);
    }
  } else {
    tarpitMap.set(ip, { score: amount, lastSeen: now, blockedUntil: null });
  }

  return tarpitMap.get(ip)!;
}

export function tarpitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const entry = tarpitMap.get(ip);

  if (entry?.blockedUntil && entry.blockedUntil > new Date()) {
    logger.warn(`Tarpit: Blocking ${ip} until ${entry.blockedUntil.toISOString()}`);
    res.status(429).json({ success: false, error: 'Temporarily blocked. Try again later.' });
    return;
  }

  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const suspiciousAgents = ['nikto', 'sqlmap', 'nmap', 'masscan', 'dirbuster', 'gobuster', 'burpsuite'];
  for (const agent of suspiciousAgents) {
    if (userAgent.includes(agent)) {
      incrementTarpitScore(ip, 10);
    }
  }

  if (req.url.includes('..') || req.url.includes('%2e%2e')) {
    incrementTarpitScore(ip, 5);
  }

  const currentEntry = tarpitMap.get(ip);
  if (currentEntry && currentEntry.score >= 5) {
    const delay = getTarpitDelay(currentEntry.score);
    logger.info(`Tarpit: Delaying response to ${ip} by ${delay}ms (score: ${currentEntry.score})`);
    setTimeout(() => next(), delay);
    return;
  }

  next();
}

export function incrementAuthFailure(ip: string): void {
  incrementTarpitScore(ip, 3);
}

export function cleanupTarpit(): void {
  const now = Date.now();
  for (const [ip, entry] of tarpitMap.entries()) {
    if (now - entry.lastSeen.getTime() > 1800000) {
      tarpitMap.delete(ip);
    }
  }
}

setInterval(cleanupTarpit, 600000);

export function getTarpitMap(): Map<string, TarpitEntry> {
  return tarpitMap;
}
