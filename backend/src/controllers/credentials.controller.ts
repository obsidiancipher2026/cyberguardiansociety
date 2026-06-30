import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin';
import { comparePassword, hashPassword } from '../utils/security';
import { buildApiResponse } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

export async function getCredentials(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      throw new AppError('Not authenticated', 401);
    }

    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
    });

    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    res.status(200).json(buildApiResponse(admin));
  } catch (error) {
    next(error);
  }
}

export async function updateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      throw new AppError('Not authenticated', 401);
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

    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
    });

    res.status(200).json(buildApiResponse(admin, 'Credentials updated'));
  } catch (error) {
    next(error);
  }
}
