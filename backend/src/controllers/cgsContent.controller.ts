import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import CgsContent from '../models/CgsContent';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
  escapeLikeSearch,
  sanitizeHtml,
} from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';
import { logAction } from '../utils/dbLogger';

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const where: Record<string, unknown> = { published: true };

    if (req.query.type) where.type = req.query.type;

    const data = await CgsContent.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });

    res.status(200).json(buildApiResponse(data));
  } catch (error) {
    next(error);
  }
}

export async function getAllAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { skip, limit, page } = calculatePagination(
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 50
    );

    const where: Record<string, unknown> = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      CgsContent.findAll({
        where,
        order: [['order', 'ASC'], ['createdAt', 'ASC']],
        offset: skip,
        limit,
      }),
      CgsContent.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const item = await CgsContent.findByPk(req.params.id);
    if (!item) {
      throw new AppError('Content not found', 404);
    }
    res.status(200).json(buildApiResponse(item));
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sanitizedBody: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        sanitizedBody[key] = sanitizeHtml(value);
      } else {
        sanitizedBody[key] = value;
      }
    }

    const maxOrderResult = await CgsContent.max('order', { where: { type: sanitizedBody.type } });
    const maxOrder = typeof maxOrderResult === 'number' ? maxOrderResult : 0;
    sanitizedBody.order = maxOrder + 1;

    const item = await CgsContent.create(sanitizedBody as any);

    await logAction('info', `CGS content created: ${item.title}`, 'cgs-content', { id: item.id, type: item.type });

    res.status(201).json(buildApiResponse(item, 'Content created'));
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const existing = await CgsContent.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Content not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }

    await CgsContent.update(updateData, { where: { id: req.params.id } });

    await logAction('info', `CGS content updated: ${req.params.id}`, 'cgs-content', { id: req.params.id });

    const item = await CgsContent.findByPk(req.params.id);

    res.status(200).json(buildApiResponse(item, 'Content updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteSection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const item = await CgsContent.findByPk(req.params.id);
    if (!item) {
      throw new AppError('Content not found', 404);
    }

    await CgsContent.destroy({ where: { id: req.params.id } });

    await logAction('warn', `CGS content deleted: ${item.title}`, 'cgs-content', { id: req.params.id });

    res.status(200).json(buildApiResponse(null, 'Content deleted'));
  } catch (error) {
    next(error);
  }
}

export async function reorder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      throw new AppError('Items must be an array', 400);
    }

    for (const item of items) {
      if (item.id && typeof item.order === 'number') {
        await CgsContent.update({ order: item.order }, { where: { id: item.id } });
      }
    }

    res.status(200).json(buildApiResponse(null, 'Order updated'));
  } catch (error) {
    next(error);
  }
}
