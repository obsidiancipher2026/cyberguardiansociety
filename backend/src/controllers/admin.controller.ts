import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Admin from '../models/Admin';
import News from '../models/News';
import ThreatIntel from '../models/ThreatIntel';
import Event from '../models/Event';
import Course from '../models/Course';
import Comment from '../models/Comment';
import ActivityLog from '../models/ActivityLog';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
  parseJsonField,
  escapeLikeSearch,
} from '../utils/helpers';

export async function getDashboard(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [
      totalNews,
      totalThreats,
      totalEvents,
      totalCourses,
      totalComments,
      totalAdmins,
      totalNewsViews,
      totalThreatViews,
      totalEventViews,
    ] = await Promise.all([
      News.count(),
      ThreatIntel.count(),
      Event.count(),
      Course.count(),
      Comment.count({ where: { approved: false } }),
      Admin.count(),
      News.sum('views'),
      ThreatIntel.sum('views'),
      Event.sum('views'),
    ]);

    const totalViews = (totalNewsViews || 0) + (totalThreatViews || 0) + (totalEventViews || 0);

    const stats = {
      news: { total: totalNews, views: totalNewsViews || 0 },
      threats: { total: totalThreats, views: totalThreatViews || 0 },
      events: { total: totalEvents, views: totalEventViews || 0 },
      courses: { total: totalCourses },
      pendingComments: totalComments,
      admins: totalAdmins,
      totalViews,
    };

    res.status(200).json(buildApiResponse(stats));
  } catch (error) {
    next(error);
  }
}

export async function getNews(
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
    if (req.query.severity) where.severity = req.query.severity;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }
    if (req.query.published !== undefined) {
      where.published = req.query.published === 'true';
    }

    const [data, total] = await Promise.all([
      News.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
        include: [{ model: Admin, as: 'publisher', attributes: ['fullName', 'email'] }],
      }),
      News.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function getThreats(
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
    if (req.query.severity) where.severity = req.query.severity;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }

    const [data, total] = await Promise.all([
      ThreatIntel.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      ThreatIntel.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function getEvents(
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
    if (req.query.eventType) where.eventType = req.query.eventType;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }

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

export async function getCourses(
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
    if (req.query.category) where.category = req.query.category;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where.title = { [Op.like]: `%${search}%` };
    }
    if (req.query.published !== undefined) {
      where.published = req.query.published === 'true';
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
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { email: { [Op.like]: `%${search}%` } },
        { username: { [Op.like]: `%${search}%` } },
        { fullName: { [Op.like]: `%${search}%` } },
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

export async function getActivityLogs(
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
    if (req.query.action) where.action = req.query.action;
    if (req.query.status) where.status = req.query.status;
    if (req.query.adminId) where.adminId = req.query.adminId;

    const [data, total] = await Promise.all([
      ActivityLog.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
        include: [{ model: Admin, as: 'actor', attributes: ['fullName', 'email'] }],
      }),
      ActivityLog.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const allowedFields = ['fullName', 'ipWhitelist'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === 'ipWhitelist' && Array.isArray(req.body[field])) {
          updates[field] = JSON.stringify(req.body[field]);
        } else {
          updates[field] = req.body[field];
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ success: false, error: 'No valid fields to update' });
      return;
    }

    await Admin.update(updates, { where: { id: req.admin.id } });

    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['passwordHash', 'twoFactorSecret', 'sessions'] },
    });

    if (!admin) {
      res.status(404).json({ success: false, error: 'Admin not found' });
      return;
    }

    await ActivityLog.create({
      adminId: parseInt(req.admin.id, 10),
      action: 'settings_updated',
      resourceType: 'admin',
      status: 'success',
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    });

    res.status(200).json({ success: true, data: admin, message: 'Settings updated' });
  } catch (error) {
    next(error);
  }
}
