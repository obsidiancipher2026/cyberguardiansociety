import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import ThreatIntel from '../models/ThreatIntel';
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

    const where: Record<string, unknown> = {};
    if (req.query.severity) where.severity = req.query.severity;
    if (req.query.type) where.type = req.query.type;
    if (req.query.cveId) where.cveId = req.query.cveId;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { cveId: { [Op.like]: `%${search}%` } },
      ];
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

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const threat = await ThreatIntel.findByPk(req.params.id);

    if (!threat) {
      throw new AppError('Threat intelligence not found', 404);
    }

    await threat.increment('views');

    res.status(200).json(buildApiResponse(threat));
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
    for (const field of ['affectedSystems', 'indicators', 'references', 'sources']) {
      if (data[field] && Array.isArray(data[field])) {
        data[field] = JSON.stringify(data[field]);
      }
    }

    const threat = await ThreatIntel.create(data as any);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'threat_created',
      resourceType: 'threat',
      resourceId: threat.id.toString(),
      changes: JSON.stringify({ after: req.body }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(201).json(buildApiResponse(threat, 'Threat intelligence created'));
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
    const existing = await ThreatIntel.findByPk(req.params.id);
    if (!existing) {
      throw new AppError('Threat intelligence not found', 404);
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        updateData[key] = sanitizeHtml(value);
      } else {
        updateData[key] = value;
      }
    }
    for (const field of ['affectedSystems', 'indicators', 'references', 'sources']) {
      if (updateData[field] && Array.isArray(updateData[field])) {
        updateData[field] = JSON.stringify(updateData[field]);
      }
    }

    await ThreatIntel.update(updateData, { where: { id: req.params.id } });

    const threat = await ThreatIntel.findByPk(req.params.id);

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'threat_updated',
      resourceType: 'threat',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: existing.get({ plain: true }), after: updateData }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(threat, 'Threat intelligence updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteThreat(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const threat = await ThreatIntel.findByPk(req.params.id);

    if (!threat) {
      throw new AppError('Threat intelligence not found', 404);
    }

    await ThreatIntel.destroy({ where: { id: req.params.id } });

    await ActivityLog.create({
      adminId: req.admin?.id ? parseInt(req.admin.id, 10) : null,
      action: 'threat_deleted',
      resourceType: 'threat',
      resourceId: req.params.id,
      changes: JSON.stringify({ before: { title: threat.title } }),
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
      status: 'success',
    });

    res.status(200).json(buildApiResponse(null, 'Threat intelligence deleted'));
  } catch (error) {
    next(error);
  }
}
