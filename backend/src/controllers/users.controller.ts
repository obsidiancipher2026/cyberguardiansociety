import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Admin from '../models/Admin';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
} from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

export async function getMembers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { skip, limit, page } = calculatePagination(
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 10
    );

    const where: Record<string, unknown> = {};
    if (req.query.role) where.role = req.query.role;
    if (req.query.search) {
      where[Op.or as any] = [
        { email: { [Op.like]: `%${req.query.search}%` } },
        { username: { [Op.like]: `%${req.query.search}%` } },
        { fullName: { [Op.like]: `%${req.query.search}%` } },
      ];
    }

    const [data, total] = await Promise.all([
      Admin.findAll({
        where,
        attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Admin.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function getMemberById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
    });

    if (!admin) {
      throw new AppError('Member not found', 404);
    }

    res.status(200).json(buildApiResponse(admin));
  } catch (error) {
    next(error);
  }
}

export async function toggleBan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      throw new AppError('Member not found', 404);
    }

    if (admin.role === 'super_admin') {
      throw new AppError('Cannot ban a super admin', 403);
    }

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      admin.lockedUntil = null;
      admin.loginAttempts = 0;
    } else {
      admin.lockedUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }

    await admin.save();

    const status = admin.lockedUntil ? 'banned' : 'unbanned';

    res.status(200).json(
      buildApiResponse(
        { id: admin.id, lockedUntil: admin.lockedUntil },
        `Member ${status} successfully`
      )
    );
  } catch (error) {
    next(error);
  }
}
