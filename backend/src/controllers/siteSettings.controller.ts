import { Request, Response, NextFunction } from 'express';
import SiteSettings from '../models/SiteSettings';
import { buildApiResponse, sanitizeHtml } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';
import { setMaintenanceMode } from '../middleware/maintenance';
import { logAction } from '../utils/dbLogger';

export async function getSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const settings = await SiteSettings.findAll();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    res.status(200).json(buildApiResponse(settingsMap));
  } catch (error) {
    next(error);
  }
}

export async function getMaintenanceStatus(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const enabled = await SiteSettings.findOne({ where: { key: 'maintenanceMode' } });
    const message = await SiteSettings.findOne({ where: { key: 'maintenanceMessage' } });

    res.status(200).json(buildApiResponse({
      enabled: enabled?.value === 'true',
      message: message?.value || 'We are currently performing scheduled maintenance. Please check back soon.',
    }));
  } catch (error) {
    next(error);
  }
}

export async function updateSetting(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined || value === null) {
      throw new AppError('Value is required', 400);
    }

    const sanitizedValue = typeof value === 'string' ? sanitizeHtml(value) : String(value);

    const [setting, created] = await SiteSettings.findOrCreate({
      where: { key },
      defaults: { key, value: sanitizedValue },
    });

    if (!created) {
      await setting.update({ value: sanitizedValue });
    }

    // Update maintenance mode cache if relevant setting changed
    if (key === 'maintenanceMode' || key === 'maintenanceMessage') {
      const enabled = key === 'maintenanceMode' ? sanitizedValue === 'true' : undefined;
      const message = key === 'maintenanceMessage' ? sanitizedValue : undefined;
      setMaintenanceMode(enabled ?? (key === 'maintenanceMessage' ? undefined as any : false), message);
      if (key === 'maintenanceMode') {
        // Reload both settings to keep cache in sync
        const msgSetting = await SiteSettings.findOne({ where: { key: 'maintenanceMessage' } });
        setMaintenanceMode(sanitizedValue === 'true', msgSetting?.value);
      }
    }

    await logAction('info', `Setting updated: ${key} = ${sanitizedValue}`, 'settings', { key, value: sanitizedValue });

    res.status(200).json(buildApiResponse({ key, value: sanitizedValue }, 'Setting updated'));
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      throw new AppError('Settings object is required', 400);
    }

    const results: Array<{ key: string; value: string }> = [];

    for (const [key, value] of Object.entries(settings)) {
      const sanitizedValue = typeof value === 'string' ? sanitizeHtml(value) : String(value);

      const [setting, created] = await SiteSettings.findOrCreate({
        where: { key },
        defaults: { key, value: sanitizedValue },
      });

      if (!created) {
        await setting.update({ value: sanitizedValue });
      }

      results.push({ key, value: sanitizedValue });
    }

    // Update maintenance mode cache if relevant settings changed
    if (settings.maintenanceMode !== undefined || settings.maintenanceMessage !== undefined) {
      const enabledSetting = settings.maintenanceMode !== undefined
        ? String(settings.maintenanceMode)
        : (await SiteSettings.findOne({ where: { key: 'maintenanceMode' } }))?.value || 'false';
      const messageSetting = settings.maintenanceMessage !== undefined
        ? String(settings.maintenanceMessage)
        : (await SiteSettings.findOne({ where: { key: 'maintenanceMessage' } }))?.value || '';
      setMaintenanceMode(enabledSetting === 'true', messageSetting);
    }

    res.status(200).json(buildApiResponse(results, 'Settings updated'));
  } catch (error) {
    next(error);
  }
}
