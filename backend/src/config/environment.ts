import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  sqlitePath: process.env.SQLITE_PATH || './data/cyberguardians.sqlite',
  jwt: {
    secret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? (() => { throw new Error('JWT_SECRET is required in production'); })() : 'dev_jwt_secret_fallback_not_for_production'),
    refreshSecret: process.env.JWT_REFRESH_SECRET || (process.env.NODE_ENV === 'production' ? (() => { throw new Error('JWT_REFRESH_SECRET is required in production'); })() : 'dev_refresh_secret_fallback_not_for_production'),
    expiry: process.env.JWT_EXPIRY || '10m',
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@cyberguardians.com',
    password: process.env.ADMIN_PASSWORD || 'CGS@Secure2024!',
  },
  adminPanelSecret: process.env.ADMIN_PANEL_SECRET || 'cg-admin-x7k9m2',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default config;
