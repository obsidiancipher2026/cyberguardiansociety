import { Request, Response, NextFunction } from 'express';
import SiteSettings from '../models/SiteSettings';

let maintenanceEnabled = false;
let maintenanceMessage = 'We are currently performing scheduled maintenance. Please check back soon.';

export async function loadMaintenanceSettings(): Promise<void> {
  try {
    const enabled = await SiteSettings.findOne({ where: { key: 'maintenanceMode' } });
    const message = await SiteSettings.findOne({ where: { key: 'maintenanceMessage' } });

    maintenanceEnabled = enabled?.value === 'true';
    if (message?.value) {
      maintenanceMessage = message.value;
    }
  } catch (error) {
    // If settings table doesn't exist yet (first run), default to false
    maintenanceEnabled = false;
  }
}

export function setMaintenanceMode(enabled: boolean, message?: string): void {
  maintenanceEnabled = enabled;
  if (message !== undefined) {
    maintenanceMessage = message;
  }
}

export function getMaintenanceStatus() {
  return {
    enabled: maintenanceEnabled,
    message: maintenanceMessage,
  };
}

export function maintenanceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Always allow admin routes, health check, and the maintenance status endpoint itself
  if (
    req.path.startsWith('/api/admin') ||
    req.path === '/api/health' ||
    req.path === '/api/site-settings/maintenance' ||
    req.path === '/api/csrf-token' ||
    req.path.startsWith('/api/auth')
  ) {
    return next();
  }

  if (maintenanceEnabled) {
    res.status(503).json({
      success: false,
      error: 'Maintenance Mode',
      message: maintenanceMessage,
      maintenanceMode: true,
    });
    return;
  }

  next();
}
