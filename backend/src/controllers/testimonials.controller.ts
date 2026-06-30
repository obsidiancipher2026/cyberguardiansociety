import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Testimonial from '../models/Testimonial';
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
    if (req.query.type) where.type = req.query.type;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { name: { [Op.like]: `%${search}%` } },
        { text: { [Op.like]: `%${search}%` } },
      ];
    }

    const [data, total] = await Promise.all([
      Testimonial.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Testimonial.count({ where }),
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
    if (req.query.published !== undefined) {
      where.published = req.query.published === 'true';
    }
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.name = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      Testimonial.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Testimonial.count({ where }),
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
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    res.status(200).json(buildApiResponse(testimonial));
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

    const testimonial = await Testimonial.create(sanitizedBody as any);

    await logAction('info', `Testimonial created: ${testimonial.name}`, 'testimonials', { id: testimonial.id });

    res.status(201).json(buildApiResponse(testimonial, 'Testimonial created'));
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
    const existing = await Testimonial.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Testimonial not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }

    await Testimonial.update(updateData, { where: { id: req.params.id } });

    await logAction('info', `Testimonial updated: ${req.params.id}`, 'testimonials', { id: req.params.id });

    const testimonial = await Testimonial.findByPk(req.params.id);

    res.status(200).json(buildApiResponse(testimonial, 'Testimonial updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteTestimonial(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    await Testimonial.destroy({ where: { id: req.params.id } });

    await logAction('warn', `Testimonial deleted: ${testimonial.name}`, 'testimonials', { id: req.params.id });

    res.status(200).json(buildApiResponse(null, 'Testimonial deleted'));
  } catch (error) {
    next(error);
  }
}
