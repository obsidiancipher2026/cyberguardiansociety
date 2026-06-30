import AppLog from '../models/AppLog';

export async function logAction(
  level: string,
  message: string,
  source: string,
  details?: Record<string, unknown>
): Promise<void> {
  try {
    await AppLog.create({
      level,
      message,
      source,
      details: details ? JSON.stringify(details) : '{}',
    });
  } catch (err) {
    console.error('Failed to write log:', err);
  }
}
