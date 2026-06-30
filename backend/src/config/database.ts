import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { config } from './environment';
import logger from '../utils/logger';

const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let sequelize: Sequelize;

if (config.databaseUrl) {
  sequelize = new Sequelize(config.databaseUrl, {
    dialect: 'postgres',
    logging: config.nodeEnv === 'development' ? (msg: string) => logger.debug(msg) : false,
    define: { timestamps: true },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  const storagePath = path.isAbsolute(config.sqlitePath)
    ? config.sqlitePath
    : path.resolve(dataDir, path.basename(config.sqlitePath));

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: config.nodeEnv === 'development' ? (msg: string) => logger.debug(msg) : false,
    define: {
      timestamps: true,
    },
  });
}

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info(config.databaseUrl ? 'PostgreSQL connected via Sequelize' : 'SQLite database connected');

    await import('../models');
    await sequelize.sync();
    logger.info('Database synchronized');

    const { seedAdmin } = await import('../scripts/seedAdmin');
    await seedAdmin();
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
};

export default sequelize;
