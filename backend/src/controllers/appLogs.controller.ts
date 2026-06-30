import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import AppLog from '../models/AppLog';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
  escapeLikeSearch,
} from '../utils/helpers';

export async function getAll(
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
    if (req.query.level) where.level = req.query.level;
    if (req.query.source) where.source = req.query.source;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.message = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      AppLog.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      AppLog.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function deleteAll(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await AppLog.destroy({ where: {}, truncate: true });

    res.status(200).json(buildApiResponse(null, 'All logs cleared'));
  } catch (error) {
    next(error);
  }
}
