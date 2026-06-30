import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import Admin from '../models/Admin';
import { comparePassword, hashPassword } from '../utils/security';
import { buildApiResponse, buildErrorResponse } from '../utils/helpers';
import { validate } from '../middleware/validation';
import { loginSchema, refreshTokenSchema } from '../utils/validators';
import { setTokenCookies, clearAuthCookies } from '../middleware/cookieAuth';
import { AppError } from '../middleware/errorHandler';
import { logAction } from '../utils/dbLogger';

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    const result = await authService.loginAdmin(email, password, ipAddress, userAgent);

    setTokenCookies(res, result.accessToken, result.refreshToken);

    await logAction('info', `Admin logged in: ${result.admin.email}`, 'auth', { ip: ipAddress });

    res.status(200).json(buildApiResponse({ admin: result.admin }, 'Login successful'));
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { refreshToken: token } = req.body;

    const result = await authService.refreshToken(token);

    res.status(200).json(buildApiResponse(result, 'Token refreshed successfully'));
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json(buildErrorResponse('Not authenticated'));
      return;
    }

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || '';
    const ipAddress = req.ip || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    await authService.logout(req.admin.id, token, ipAddress, userAgent);

    clearAuthCookies(res);

    await logAction('info', `Admin logged out: ${req.admin.email}`, 'auth', { ip: ipAddress });

    res.status(200).json(buildApiResponse(null, 'Logged out successfully'));
  } catch (error) {
    next(error);
  }
}

export async function changeCredentials(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json(buildErrorResponse('Not authenticated'));
      return;
    }

    const { email, fullName, currentPassword, newPassword } = req.body;

    const updates: Record<string, unknown> = {};
    if (email) updates.email = email;
    if (fullName) updates.fullName = fullName;

    if (newPassword) {
      if (!currentPassword) {
        throw new AppError('Current password is required to set a new password', 400);
      }

      const admin = await Admin.findByPk(req.admin.id);
      if (!admin) {
        throw new AppError('Admin not found', 404);
      }

      const isPasswordValid = await comparePassword(currentPassword, admin.passwordHash);
      if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401);
      }

      updates.passwordHash = await hashPassword(newPassword);
    }

    if (Object.keys(updates).length === 0) {
      throw new AppError('No fields to update', 400);
    }

    await Admin.update(updates, { where: { id: req.admin.id } });

    await logAction('info', `Admin credentials updated: ${req.admin.email}`, 'auth', { fields: Object.keys(updates) });

    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
    });

    res.status(200).json(buildApiResponse(admin, 'Credentials updated'));
  } catch (error) {
    next(error);
  }
}
