import sequelize from '../config/database';
import logger from '../utils/logger';

async function migrateTable(
  name: string,
  model: any,
  prismaDelegate: any,
  transform?: (row: any) => any
): Promise<void> {
  try {
    const rows = await model.findAll({ raw: true });
    if (rows.length === 0) {
      logger.info(`  ${name}: 0 rows, skipping`);
      return;
    }
    for (const row of rows) {
      const data = transform ? transform(row) : row;
      await prismaDelegate.create({ data });
    }
    logger.info(`  ${name}: ${rows.length} rows migrated`);
  } catch (error) {
    logger.warn(`  ${name}: error — ${error instanceof Error ? error.message : error}`);
  }
}

export async function migrateSqliteToPostgres(): Promise<void> {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    logger.info('Starting SQLite → PostgreSQL migration...');

    await migrateTable('Admin', (await import('../models/Admin')).default, prisma.admin);
    await migrateTable('News', (await import('../models/News')).default, prisma.news);
    await migrateTable('ThreatIntel', (await import('../models/ThreatIntel')).default, prisma.threatIntel);
    await migrateTable('Event', (await import('../models/Event')).default, prisma.event);
    await migrateTable('Course', (await import('../models/Course')).default, prisma.course);
    await migrateTable('Comment', (await import('../models/Comment')).default, prisma.comment);
    await migrateTable('ActivityLog', (await import('../models/ActivityLog')).default, prisma.activityLog);
    await migrateTable('SecurityToken', (await import('../models/SecurityToken')).default, prisma.securityToken);
    await migrateTable('Opening', (await import('../models/Opening')).default, prisma.opening);
    await migrateTable('Resource', (await import('../models/Resource')).default, prisma.resource);
    await migrateTable('Testimonial', (await import('../models/Testimonial')).default, prisma.testimonial);
    await migrateTable('GalleryItem', (await import('../models/GalleryItem')).default, prisma.galleryItem);
    await migrateTable('ContactSubmission', (await import('../models/ContactSubmission')).default, prisma.contactSubmission);
    await migrateTable('AppLog', (await import('../models/AppLog')).default, prisma.appLog);
    await migrateTable('CgsContent', (await import('../models/CgsContent')).default, prisma.cgsContent);
    await migrateTable('SiteSettings', (await import('../models/SiteSettings')).default, prisma.siteSettings);

    logger.info('Migration complete.');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await sequelize.close();
  }
}

if (require.main === module) {
  migrateSqliteToPostgres()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
