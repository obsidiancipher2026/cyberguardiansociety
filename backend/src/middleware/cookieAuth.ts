import { Request, Response, NextFunction } from 'express';

export function cookieAuthMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const accessToken = req.cookies?.accessToken;

  if (accessToken && !req.headers.authorization) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }

  next();
}

export function setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'lax' : 'lax',
    path: '/',
    maxAge: 10 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'lax' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function rotateRefreshCookie(res: Response, newRefreshToken: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'lax' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/api/auth' });
}
