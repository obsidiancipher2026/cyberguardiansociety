import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { buildErrorResponse } from '../utils/helpers';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    logger.warn(`Operational error: ${err.message} (${err.statusCode})`);
    res.status(err.statusCode).json(buildErrorResponse(err.message));
    return;
  }

  logger.error('Unhandled error:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json(buildErrorResponse('Validation error. Please check your input.'));
    return;
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json(buildErrorResponse('Referenced resource not found'));
    return;
  }

  if (err.name === 'SequelizeDatabaseError') {
    res.status(400).json(buildErrorResponse('Invalid data format'));
    return;
  }

  res.status(500).json(
    buildErrorResponse('Internal server error')
  );
}
