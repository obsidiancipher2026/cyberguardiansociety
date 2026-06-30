import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Course from '../models/Course';
import ActivityLog from '../models/ActivityLog';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
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
    if (req.query.level) where.level = req.query.level;
    if (req.query.category) where.category = req.query.category;
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
      Course.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Course.count({ where }),
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
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (!course.published && (!req.admin || req.admin.role === 'moderator')) {
      throw new AppError('Course not found', 404);
    }

    res.status(200).json(buildApiResponse(course));
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

    const data: Record<string, unknown> = { ...sanitizedBody };
    for (const field of ['modules', 'prerequisites', 'tags']) {
      if (data[field] && Array.isArray(data[field])) {
        data[field] = JSON.stringify(data[field]);
      }
    }

    const course = await Course.create(data as any);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'course_created',
      resourceType: 'course',
      resourceId: course.id.toString(),
      changes: JSON.stringify({ after: req.body }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(201).json(buildApiResponse(course, 'Course created'));
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
    const existing = await Course.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Course not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }
    for (const field of ['modules', 'prerequisites', 'tags']) {
      if (updateData[field] && Array.isArray(updateData[field])) {
        updateData[field] = JSON.stringify(updateData[field]);
      }
    }

    await Course.update(updateData, { where: { id: req.params.id } });

    const course = await Course.findByPk(req.params.id);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'course_updated',
      resourceType: 'course',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: existing.get({ plain: true }), after: updateData }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(course, 'Course updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    await Course.destroy({ where: { id: req.params.id } });

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'course_deleted',
      resourceType: 'course',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: { title: course.title } }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(null, 'Course deleted'));
  } catch (error) {
    next(error);
  }
}
