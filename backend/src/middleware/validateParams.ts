import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { buildErrorResponse } from '../utils/helpers';

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const { error } = idParamSchema.validate(req.params);
  if (error) {
    res.status(400).json(buildErrorResponse('Invalid ID parameter'));
    return;
  }
  next();
}

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).max(1000).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().max(200).allow('', null),
});

export function validatePaginationQuery(req: Request, res: Response, next: NextFunction): void {
  const { error, value } = paginationSchema.validate(req.query);
  if (error) {
    res.status(400).json(buildErrorResponse(`Invalid query parameter: ${error.details[0].message}`));
    return;
  }
  req.query = value;
  next();
}
