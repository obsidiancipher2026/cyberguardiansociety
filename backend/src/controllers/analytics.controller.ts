import { Request, Response, NextFunction } from 'express';
import { Op, fn, col } from 'sequelize';
import sequelize from '../config/database';
import Admin from '../models/Admin';
import News from '../models/News';
import ThreatIntel from '../models/ThreatIntel';
import Event from '../models/Event';
import Course from '../models/Course';
import Comment from '../models/Comment';
import { buildApiResponse } from '../utils/helpers';

export async function getDashboardStats(
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
      pendingComments,
      totalAdmins,
      totalViews,
    ] = await Promise.all([
      News.count(),
      ThreatIntel.count(),
      Event.count(),
      Course.count(),
      Comment.count({ where: { approved: false } }),
      Admin.count(),
      News.sum('views'),
    ]);

    const stats = {
      content: {
        news: totalNews,
        threats: totalThreats,
        events: totalEvents,
        courses: totalCourses,
      },
      engagement: {
        pendingComments,
        totalViews: totalViews || 0,
      },
      admins: totalAdmins,
    };

    res.status(200).json(buildApiResponse(stats));
  } catch (error) {
    next(error);
  }
}

export async function getUserGrowth(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const data = await Admin.findAll({
      attributes: [
        [fn('strftime', '%Y', col('createdAt')), 'year'],
        [fn('strftime', '%m', col('createdAt')), 'month'],
        [fn('count', col('id')), 'count'],
      ],
      where: {
        createdAt: { [Op.gte]: twelveMonthsAgo },
      },
      group: [
        fn('strftime', '%Y', col('createdAt')),
        fn('strftime', '%m', col('createdAt')),
      ],
      order: [
        [fn('strftime', '%Y', col('createdAt')), 'ASC'],
        [fn('strftime', '%m', col('createdAt')), 'ASC'],
      ],
      raw: true,
    }) as unknown as Array<{ year: string; month: string; count: number }>;

    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const existing = data.find(
        (item) => parseInt(item.year, 10) === d.getFullYear() && parseInt(item.month, 10) === d.getMonth() + 1
      );
      months.push({
        month: key,
        count: existing?.count || 0,
      });
    }

    res.status(200).json(buildApiResponse(months));
  } catch (error) {
    next(error);
  }
}

export async function getContentDistribution(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [newsCount, threatCount, eventCount, courseCount] = await Promise.all([
      News.count(),
      ThreatIntel.count(),
      Event.count(),
      Course.count(),
    ]);

    const distribution = [
      { name: 'News', value: newsCount },
      { name: 'Threats', value: threatCount },
      { name: 'Events', value: eventCount },
      { name: 'Courses', value: courseCount },
    ];

    res.status(200).json(buildApiResponse(distribution));
  } catch (error) {
    next(error);
  }
}
