import crypto from 'crypto';
import { comparePassword } from '../utils/security';
import { AppError } from '../middleware/errorHandler';
import config from '../config/environment';
import {
  LOGIN_MAX_ATTEMPTS,
  LOGIN_LOCKOUT_MINUTES,
} from '../config/constants';
import Admin from '../models/Admin';
import ActivityLog from '../models/ActivityLog';
import jwtService from './jwt.service';

function getTokenFingerprint(ip: string, userAgent: string): string {
  return crypto.createHash('sha256').update(`${userAgent}:${ip}`).digest('hex').substring(0, 16);
}

export class AuthService {
  async loginAdmin(
    email: string,
    password: string,
    ipAddress: string = '',
    userAgent: string = ''
  ): Promise<{ accessToken: string; refreshToken: string; admin: { id: string; email: string; role: string } }> {
    const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });

    if (!admin) {
      throw new AppError('Invalid email or password', 401);
    }

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (admin.lockedUntil.getTime() - Date.now()) / 60000
      );
      throw new AppError(
        `Account locked. Try again in ${remainingMinutes} minutes.`,
        423
      );
    }

    const isPasswordValid = await comparePassword(password, admin.passwordHash);

    if (!isPasswordValid) {
      admin.loginAttempts += 1;

      if (admin.loginAttempts >= LOGIN_MAX_ATTEMPTS) {
        admin.lockedUntil = new Date(
          Date.now() + LOGIN_LOCKOUT_MINUTES * 60 * 1000
        );
        await admin.save();

        await ActivityLog.create({
          adminId: admin.id,
          action: 'account_locked',
          status: 'failed',
          errorMessage: 'Account locked due to too many failed attempts',
          ipAddress,
          userAgent,
        });

        throw new AppError(
          `Account locked for ${LOGIN_LOCKOUT_MINUTES} minutes due to too many failed attempts.`,
          423
        );
      }

      await admin.save();
      throw new AppError('Invalid email or password', 401);
    }

    admin.loginAttempts = 0;
    admin.lockedUntil = null;

    const payload = {
      id: admin.id.toString(),
      email: admin.email,
      role: admin.role,
    };

    const tokens = jwtService.generateTokenPair(payload);

    const sessionExpiry = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    const rawSessions = admin.get('sessions', { plain: true });
    const sessions: Array<{
      token: string;
      expiresAt: Date;
      ipAddress: string;
      userAgent: string;
      createdAt: Date;
      fingerprint: string;
    }> = Array.isArray(rawSessions) ? rawSessions : [];

    const fingerprint = getTokenFingerprint(ipAddress, userAgent);

    sessions.push({
      token: tokens.accessToken,
      expiresAt: sessionExpiry,
      ipAddress,
      userAgent,
      createdAt: new Date(),
      fingerprint,
    });

    admin.sessions = JSON.stringify(sessions);
    admin.lastLogin = new Date();
    await admin.save();

    await ActivityLog.create({
      adminId: admin.id,
      action: 'login_success',
      resourceType: 'auth',
      status: 'success',
      ipAddress,
      userAgent,
    });

    return {
      ...tokens,
      admin: {
        id: admin.id.toString(),
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    try {
      const decoded = jwtService.verifyRefreshToken(refreshToken);

      const admin = await Admin.findByPk(decoded.id);
      if (!admin) {
        throw new AppError('Admin not found', 404);
      }

      if (admin.lockedUntil && admin.lockedUntil > new Date()) {
        throw new AppError('Account is locked', 423);
      }

      const payload = {
        id: admin.id.toString(),
        email: admin.email,
        role: admin.role,
      };

      const accessToken = jwtService.generateAccessToken(payload);

      return { accessToken };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }

  async logout(
    adminId: string,
    token: string,
    ipAddress: string = '',
    userAgent: string = ''
  ): Promise<void> {
    const admin = await Admin.findByPk(adminId);
    if (admin) {
      const rawSessions = admin.get('sessions', { plain: true });
      const sessions: Array<{ token: string }> = Array.isArray(rawSessions) ? rawSessions : [];
      const filtered = sessions.filter((s) => s.token !== token);
      admin.sessions = JSON.stringify(filtered);
      await admin.save();
    }

    await ActivityLog.create({
      adminId: parseInt(adminId, 10),
      action: 'logout',
      resourceType: 'auth',
      status: 'success',
      ipAddress,
      userAgent,
    });
  }
}

export const authService = new AuthService();
export default authService;
