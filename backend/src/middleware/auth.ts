import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { verifyToken } from '../utils/security';
import Admin from '../models/Admin';
import { JwtPayload } from '../types';
import { buildErrorResponse } from '../utils/helpers';
import { incrementAuthFailure } from './tarpit';

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

function getTokenFingerprint(req: Request): string {
  const ua = req.headers['user-agent'] || '';
  const ip = req.ip || req.socket.remoteAddress || '';
  return crypto.createHash('sha256').update(`${ua}:${ip}`).digest('hex').substring(0, 16);
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      res.status(401).json(buildErrorResponse('Access denied. No token provided.'));
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;
    const fingerprint = getTokenFingerprint(req);

    const admin = await Admin.findByPk(decoded.id, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!admin) {
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      incrementAuthFailure(ip);
      res.status(401).json(buildErrorResponse('Access denied. Admin not found.'));
      return;
    }

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      res.status(423).json(buildErrorResponse('Account is locked. Try again later.'));
      return;
    }

    const rawSessions = admin.get('sessions', { plain: true });
    const sessions: Array<{ token: string; fingerprint?: string }> = Array.isArray(rawSessions) ? rawSessions : [];
    const hasValidSession = sessions.some((s) => {
      const tokenMatch = s.token === token;
      const fingerprintMatch = !s.fingerprint || s.fingerprint === fingerprint;
      return tokenMatch && fingerprintMatch;
    });

    if (!hasValidSession) {
      res.status(401).json(buildErrorResponse('Session expired. Please login again.'));
      return;
    }

    const rawPermissions = admin.get('permissions', { plain: true });
    const permissions: string[] = Array.isArray(rawPermissions) ? rawPermissions : [];

    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      permissions,
    };

    next();
  } catch (error) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    incrementAuthFailure(ip);

    if ((error as Error).name === 'JsonWebTokenError') {
      res.status(401).json(buildErrorResponse('Invalid token.'));
      return;
    }
    if ((error as Error).name === 'TokenExpiredError') {
      res.status(401).json(buildErrorResponse('Token expired.'));
      return;
    }
    next(error);
  }
}

export function authorize(...allowedPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.admin) {
      res.status(401).json(buildErrorResponse('Not authenticated.'));
      return;
    }

    if (req.admin.role === 'super_admin') {
      next();
      return;
    }

    const hasPermission = allowedPermissions.some((perm) =>
      req.admin!.permissions.includes(perm)
    );

    if (!hasPermission) {
      res.status(403).json(buildErrorResponse('Insufficient permissions.'));
      return;
    }

    next();
  };
}
