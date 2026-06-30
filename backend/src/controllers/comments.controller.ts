import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Comment from '../models/Comment';
import News from '../models/News';
import ThreatIntel from '../models/ThreatIntel';
import Event from '../models/Event';
import Course from '../models/Course';
import {
  buildApiResponse,
  buildPaginatedResponse,
  calculatePagination,
  sanitizeHtml,
} from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

export async function getComments(
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
    if (req.query.targetId) where.targetId = req.query.targetId;
    if (req.query.targetType) where.targetType = req.query.targetType;
    if (req.query.approved !== undefined) {
      where.approved = req.query.approved === 'true';
    }
    if (req.query.flagged === 'true') where.flagged = true;

    const [data, total] = await Promise.all([
      Comment.findAll({
        where,
        order: [['createdAt', 'DESC']],
        offset: skip,
        limit,
      }),
      Comment.count({ where }),
    ]);

    res.status(200).json(buildPaginatedResponse(data, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { targetId, targetType, authorName, authorEmail, content } = req.body;

    let parentExists = false;
    switch (targetType) {
      case 'news':
        parentExists = !!(await News.findByPk(targetId));
        break;
      case 'threat':
        parentExists = !!(await ThreatIntel.findByPk(targetId));
        break;
      case 'event':
        parentExists = !!(await Event.findByPk(targetId));
        break;
      case 'course':
        parentExists = !!(await Course.findByPk(targetId));
        break;
    }

    if (!parentExists) {
      throw new AppError('Target resource not found', 404);
    }

    const comment = await Comment.create({
      targetId: parseInt(targetId, 10),
      targetType,
      authorName: sanitizeHtml(authorName || ''),
      authorEmail: sanitizeHtml(authorEmail || ''),
      content: sanitizeHtml(content),
      approved: false,
    });

    res.status(201).json(buildApiResponse(comment, 'Comment submitted for approval'));
  } catch (error) {
    next(error);
  }
}

export async function approveComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { approved } = req.body;
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    await comment.update({ approved });

    await updateCommentsCount(comment.targetType, comment.targetId, approved ? 1 : -1);

    res.status(200).json(
      buildApiResponse(comment, `Comment ${approved ? 'approved' : 'disapproved'}`)
    );
  } catch (error) {
    next(error);
  }
}

export async function flagComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { flagged } = req.body;
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    await comment.update({ flagged });

    res.status(200).json(
      buildApiResponse(comment, `Comment ${flagged ? 'flagged' : 'unflagged'}`)
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    if (comment.approved) {
      await updateCommentsCount(comment.targetType, comment.targetId, -1);
    }

    await Comment.destroy({ where: { id: req.params.id } });

    res.status(200).json(buildApiResponse(null, 'Comment deleted'));
  } catch (error) {
    next(error);
  }
}

async function updateCommentsCount(
  targetType: string,
  targetId: number,
  delta: number
): Promise<void> {
  const increment = { commentsCount: delta } as any;
  switch (targetType) {
    case 'news':
      await News.increment('commentsCount', { by: delta, where: { id: targetId } });
      break;
    case 'threat':
      await ThreatIntel.increment('commentsCount', { by: delta, where: { id: targetId } });
      break;
    case 'event':
      await Event.increment('commentsCount', { by: delta, where: { id: targetId } });
      break;
    case 'course':
      await Course.increment('commentsCount', { by: delta, where: { id: targetId } });
      break;
  }
}
