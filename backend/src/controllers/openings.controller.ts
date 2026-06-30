import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Opening from '../models/Opening';
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
    const { skip, limit, page } = calculatePagination(
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 10
    );

    const where: Record<string, unknown> = { status: 'open' };
    if (req.query.type) where.type = req.query.type;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }
    if (req.query.tag) {
      const tag = escapeLikeSearch(req.query.tag as string);
      where.tags = { [Op.like]: `%"${tag}"%` };
    }

    const [data, total] = await Promise.all([
      Opening.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Opening.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
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
      parseInt(req.query.limit as string) || 10
    );

    const where: Record<string, unknown> = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.status) where.status = req.query.status;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      Opening.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Opening.count({ where }),
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
    const opening = await Opening.findByPk(req.params.id);
    if (!opening) {
      throw new AppError('Opening not found', 404);
    }
    res.status(200).json(buildApiResponse(opening));
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

    if (sanitizedBody.tags && Array.isArray(sanitizedBody.tags)) {
      sanitizedBody.tags = JSON.stringify(sanitizedBody.tags);
    }

    const opening = await Opening.create(sanitizedBody as any);

    await logAction('info', `Opening created: ${opening.title}`, 'openings', { id: opening.id });

    res.status(201).json(buildApiResponse(opening, 'Opening created'));
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
    const existing = await Opening.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Opening not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }
    if (updateData.tags && Array.isArray(updateData.tags)) {
      updateData.tags = JSON.stringify(updateData.tags);
    }

    await Opening.update(updateData, { where: { id: req.params.id } });

    await logAction('info', `Opening updated: ${req.params.id}`, 'openings', { id: req.params.id });

    const opening = await Opening.findByPk(req.params.id);

    res.status(200).json(buildApiResponse(opening, 'Opening updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteOpening(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const opening = await Opening.findByPk(req.params.id);
    if (!opening) {
      throw new AppError('Opening not found', 404);
    }

    await Opening.destroy({ where: { id: req.params.id } });

    await logAction('warn', `Opening deleted: ${opening.title}`, 'openings', { id: req.params.id });

    res.status(200).json(buildApiResponse(null, 'Opening deleted'));
  } catch (error) {
    next(error);
  }
}
