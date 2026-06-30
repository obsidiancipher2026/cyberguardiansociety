import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import corsMiddleware from './middleware/cors';
import httpLogger from './middleware/logging';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase } from './config/database';
import config from './config/environment';
import logger from './utils/logger';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import publicRoutes from './routes/public.routes';
import { wafMiddleware, shutdownWafCleanup } from './middleware/waf';
import { tarpitMiddleware } from './middleware/tarpit';
import { sanitizeBody } from './middleware/sanitize';
import { cookieAuthMiddleware } from './middleware/cookieAuth';
import { timeoutMiddleware } from './middleware/timeout';
import { csrfTokenEndpoint } from './middleware/csrf';
import uploadRoutes from './routes/upload.routes';
import { maintenanceMiddleware, loadMaintenanceSettings } from './middleware/maintenance';

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

app.use(corsMiddleware);
app.use(cookieParser());
app.use(timeoutMiddleware(30000));
app.use(wafMiddleware);
app.use(tarpitMiddleware);
app.use(sanitizeBody);
app.use(cookieAuthMiddleware);
app.use(httpLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', apiLimiter);
app.use('/api', maintenanceMiddleware);

app.get('/api/csrf-token', csrfTokenEndpoint);

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);
app.use('/api/admin', uploadRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    await loadMaintenanceSettings();

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
      logger.info(`Health check: http://localhost:${config.port}/api/health`);
      logger.info(`API Base: http://localhost:${config.port}/api`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error | unknown) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  shutdownWafCleanup();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  shutdownWafCleanup();
  process.exit(0);
});

startServer();

export default app;
