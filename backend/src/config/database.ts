import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { config } from './environment';
import logger from '../utils/logger';

export let prisma: any = null;

const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const storagePath = path.isAbsolute(config.sqlitePath)
  ? config.sqlitePath
  : path.resolve(dataDir, path.basename(config.sqlitePath));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: config.nodeEnv === 'development' ? (msg: string) => logger.debug(msg) : false,
  define: {
    timestamps: true,
  },
});

export const connectDatabase = async (): Promise<void> => {
  if (config.databaseUrl) {
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
    try {
      await prisma.$connect();
      logger.info('PostgreSQL connected via Prisma');
    } catch (error) {
      logger.error('PostgreSQL connection failed:', error);
      throw error;
    }
  } else {
    try {
      await sequelize.authenticate();
      logger.info('SQLite database connected');

      await import('../models');
      await sequelize.sync();
      logger.info('Database synchronized');

      const { seedAdmin } = await import('../scripts/seedAdmin');
      await seedAdmin();
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw error;
    }
  }
};

export default sequelize;
