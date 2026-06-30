import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Event from '../models/Event';
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

    const where: any = {};
    if (req.query.eventType) where.eventType = req.query.eventType;

    if (req.query.startDate || req.query.endDate) {
      where.eventDate = {};
      if (req.query.startDate) {
        where.eventDate[Op.gte] = new Date(
          req.query.startDate as string
        );
      }
      if (req.query.endDate) {
        where.eventDate[Op.lte] = new Date(
          req.query.endDate as string
        );
      }
    }

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
    if (req.query.featured === 'true') where.featured = true;

    const [data, total] = await Promise.all([
      Event.findAll({
        where,
        order: [['eventDate', 'DESC']],
        offset: skip,
        limit,
      }),
      Event.count({ where }),
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
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    await event.increment('views');

    res.status(200).json(buildApiResponse(event));
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
    for (const field of ['speakers', 'tags', 'agendaItems']) {
      if (data[field] && Array.isArray(data[field])) {
        data[field] = JSON.stringify(data[field]);
      }
    }

    const event = await Event.create(data as any);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'event_created',
      resourceType: 'event',
      resourceId: event.id.toString(),
      changes: JSON.stringify({ after: req.body }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(201).json(buildApiResponse(event, 'Event created'));
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
    const existing = await Event.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Event not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }
    for (const field of ['speakers', 'tags', 'agendaItems']) {
      if (updateData[field] && Array.isArray(updateData[field])) {
        updateData[field] = JSON.stringify(updateData[field]);
      }
    }

    await Event.update(updateData, { where: { id: req.params.id } });

    const event = await Event.findByPk(req.params.id);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'event_updated',
      resourceType: 'event',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: existing.get({ plain: true }), after: updateData }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(event, 'Event updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      throw new AppError('Event not found', 404);
    }

    await Event.destroy({ where: { id: req.params.id } });

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'event_deleted',
      resourceType: 'event',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: { title: event.title } }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(null, 'Event deleted'));
  } catch (error) {
    next(error);
  }
}
