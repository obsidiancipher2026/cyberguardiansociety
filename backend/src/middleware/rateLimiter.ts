import rateLimit from 'express-rate-limit';
import { buildErrorResponse } from '../utils/helpers';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: buildErrorResponse('Too many login attempts. Try again in 15 minutes.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: buildErrorResponse('Too many requests. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: buildErrorResponse('Too many token refresh attempts. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const commentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: buildErrorResponse('Too many comments. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: buildErrorResponse('Too many file uploads. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const adminWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: buildErrorResponse('Too many write operations. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: buildErrorResponse('Too many accounts created from this IP.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: buildErrorResponse('Too many contact submissions. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
});
