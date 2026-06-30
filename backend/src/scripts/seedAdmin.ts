import Admin from '../models/Admin';
import { hashPassword } from '../utils/security';
import config from '../config/environment';
import logger from '../utils/logger';

export async function seedAdmin(): Promise<void> {
  try {
    const existingAdmin = await Admin.findOne({ where: { email: config.admin.email.toLowerCase() } });

    if (existingAdmin) {
      logger.info('Admin account already exists, skipping seed');
      return;
    }

    const passwordHash = await hashPassword(config.admin.password);

    await Admin.create({
      email: config.admin.email.toLowerCase(),
      username: 'admin',
      passwordHash,
      fullName: 'System Administrator',
      role: 'super_admin',
      permissions: JSON.stringify([
        'manage_admins',
        'manage_news',
        'manage_threats',
        'manage_events',
        'manage_courses',
        'manage_members',
        'manage_settings',
        'view_analytics',
        'manage_comments',
      ]),
      sessions: JSON.stringify([]),
    });

    logger.info(`Admin account seeded: ${config.admin.email}`);
  } catch (error) {
    logger.error('Failed to seed admin account:', error);
    throw error;
  }
}
