import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import GalleryItem from '../models/GalleryItem';
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

    const where: Record<string, unknown> = { published: true };
    if (req.query.category) where.category = req.query.category;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const [data, total] = await Promise.all([
      GalleryItem.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      GalleryItem.count({ where }),
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
    if (req.query.category) where.category = req.query.category;
    if (req.query.published !== undefined) {
      where.published = req.query.published === 'true';
    }
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      GalleryItem.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      GalleryItem.count({ where }),
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
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) {
      throw new AppError('Gallery item not found', 404);
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

    const item = await GalleryItem.create(sanitizedBody as any);

    await logAction('info', `Gallery item created: ${item.title}`, 'gallery', { id: item.id });

    res.status(201).json(buildApiResponse(item, 'Gallery item created'));
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
    const existing = await GalleryItem.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Gallery item not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }

    await GalleryItem.update(updateData, { where: { id: req.params.id } });

    await logAction('info', `Gallery item updated: ${req.params.id}`, 'gallery', { id: req.params.id });

    const item = await GalleryItem.findByPk(req.params.id);

    res.status(200).json(buildApiResponse(item, 'Gallery item updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }

    await GalleryItem.destroy({ where: { id: req.params.id } });

    await logAction('warn', `Gallery item deleted: ${item.title}`, 'gallery', { id: req.params.id });

    res.status(200).json(buildApiResponse(null, 'Gallery item deleted'));
  } catch (error) {
    next(error);
  }
}
