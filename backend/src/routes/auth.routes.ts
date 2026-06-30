import { Router } from 'express';
import { login, refreshToken, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { loginLimiter, refreshTokenLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validation';
import { loginSchema, refreshTokenSchema } from '../utils/validators';

const router = Router();

router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/refresh-token', refreshTokenLimiter, validate(refreshTokenSchema), refreshToken);
router.post('/logout', authenticate, logout);

export default router;
