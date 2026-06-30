import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { buildErrorResponse } from '../utils/helpers';

const CSRF_SECRET = crypto.randomBytes(32).toString('hex');

function generateCsrfToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const signature = crypto.createHmac('sha256', CSRF_SECRET).update(token).digest('hex');
  return `${token}.${signature}`;
}

function verifyCsrfToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [tokenPart, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', CSRF_SECRET).update(tokenPart).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'));
}

export function csrfProtection(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    next();
    return;
  }

  const origin = req.headers.origin || req.headers.referer;
  const host = req.headers.host;

  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (host && originUrl.host !== host) {
        res.status(403).json(buildErrorResponse('CSRF validation failed: origin mismatch'));
        return;
      }
    } catch {
      res.status(403).json(buildErrorResponse('CSRF validation failed: invalid origin'));
      return;
    }
  }

  const csrfToken = req.headers['x-csrf-token'] as string | undefined;
  const csrfCookie = req.cookies?.csrfToken;

  if (!csrfToken || !csrfCookie) {
    res.status(403).json(buildErrorResponse('CSRF token missing'));
    return;
  }

  if (csrfToken !== csrfCookie) {
    res.status(403).json(buildErrorResponse('CSRF token mismatch'));
    return;
  }

  if (!verifyCsrfToken(csrfToken)) {
    res.status(403).json(buildErrorResponse('CSRF token invalid'));
    return;
  }

  next();
}

export function csrfTokenEndpoint(_req: Request, res: Response): void {
  const token = generateCsrfToken();
  res.cookie('csrfToken', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 1000,
  });
  res.json({ success: true, csrfToken: token });
}
