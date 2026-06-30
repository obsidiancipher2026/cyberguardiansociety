import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import News from '../models/News';
import Admin from '../models/Admin';
import ActivityLog from '../models/ActivityLog';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
  generateSlug,
  escapeLikeSearch,
  sanitizeHtml,
} from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

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
    if (req.query.severity) where.severity = req.query.severity;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }
    if (req.query.tag) {
      const tag = escapeLikeSearch(req.query.tag as string);
      where.tags = { [Op.like]: `%"${tag}"%` };
    }

    const [data, total] = await Promise.all([
      News.findAll({
        where,
        attributes: { exclude: ['content'] },
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      News.count({ where }),
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
    const news = await News.findByPk(req.params.id, {
      include: [{ model: Admin, as: 'publisher', attributes: ['fullName'] }],
    });

    if (!news) {
      throw new AppError('News article not found', 404);
    }

    await news.increment('views');

    res.status(200).json(buildApiResponse(news));
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

    const data: Record<string, unknown> = {
      ...sanitizedBody,
      slug: generateSlug(sanitizedBody.title as string),
      createdBy: req.admin?.id ? parseInt(req.admin.id, 10) : null,
    };

    if (data.tags && Array.isArray(data.tags)) {
      data.tags = JSON.stringify(data.tags);
    }

    const news = await News.create(data as any);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'news_created',
      resourceType: 'news',
      resourceId: news.id.toString(),
      changes: JSON.stringify({ after: req.body }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(201).json(buildApiResponse(news, 'News article created'));
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
    const existing = await News.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('News article not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title as string);
    }
    if (updateData.published && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
    if (updateData.tags && Array.isArray(updateData.tags)) {
      updateData.tags = JSON.stringify(updateData.tags);
    }

    await News.update(updateData, { where: { id: req.params.id } });

    const news = await News.findByPk(req.params.id);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'news_updated',
      resourceType: 'news',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: existing.get({ plain: true }), after: updateData }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(news, 'News article updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteNews(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news) {
      throw new AppError('News article not found', 404);
    }

    await News.destroy({ where: { id: req.params.id } });

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'news_deleted',
      resourceType: 'news',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: { title: news.title } }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(null, 'News article deleted'));
  } catch (error) {
    next(error);
  }
}
