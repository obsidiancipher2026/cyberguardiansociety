import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { buildErrorResponse } from '../utils/helpers';

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      res.status(400).json(buildErrorResponse(messages));
      return;
    }

    req.body = value;
    next();
  };
}

export function validateQuery(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      res.status(400).json(buildErrorResponse(messages));
      return;
    }

    req.query = value;
    next();
  };
}
