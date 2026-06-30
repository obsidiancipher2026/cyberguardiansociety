import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import ContactSubmission from '../models/ContactSubmission';
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

    const where: Record<string, unknown> = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.search) {
      const search = escapeLikeSearch(req.query.search as string);
      where[Op.or as any] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { subject: { [Op.like]: `%${search}%` } },
      ];
    }

    const [data, total] = await Promise.all([
      ContactSubmission.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      ContactSubmission.count({ where }),
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
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      throw new AppError('Contact submission not found', 404);
    }
    res.status(200).json(buildApiResponse(submission));
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

    const submission = await ContactSubmission.create(sanitizedBody as any);

    await logAction('info', `Contact submission: ${sanitizedBody.name} <${sanitizedBody.email}>`, 'contact', { id: submission.id, subject: sanitizedBody.subject });

    const whatsappUrl = `https://api.whatsapp.com/send?phone=923261458036&text=New%20contact%20form%20submission%0AName:%20${encodeURIComponent(sanitizedBody.name as string)}%0AEmail:%20${encodeURIComponent(sanitizedBody.email as string)}%0ASubject:%20${encodeURIComponent(sanitizedBody.subject as string)}%0AMessage:%20${encodeURIComponent(sanitizedBody.message as string)}`;
    console.log('WhatsApp notification URL:', whatsappUrl);

    res.status(201).json(buildApiResponse(submission, 'Contact submission created'));
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      throw new AppError('Contact submission not found', 404);
    }

    const { status } = req.body;
    if (!status || !['new', 'read', 'replied'].includes(status)) {
      throw new AppError('Invalid status value', 400);
    }

    await ContactSubmission.update({ status }, { where: { id: req.params.id } });

    await logAction('info', `Contact submission status updated: ${status}`, 'contact', { id: req.params.id, status });

    const updated = await ContactSubmission.findByPk(req.params.id);

    res.status(200).json(buildApiResponse(updated, 'Status updated'));
  } catch (error) {
    next(error);
  }
}

export async function deleteSubmission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);
    if (!submission) {
      throw new AppError('Contact submission not found', 404);
    }

    await ContactSubmission.destroy({ where: { id: req.params.id } });

    await logAction('warn', `Contact submission deleted`, 'contact', { id: req.params.id });

    res.status(200).json(buildApiResponse(null, 'Contact submission deleted'));
  } catch (error) {
    next(error);
  }
}
