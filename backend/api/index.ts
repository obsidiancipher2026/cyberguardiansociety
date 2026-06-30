import app, { bootstrap } from '../src/app';

let initialized = false;
let bootstrapError: string | null = null;

export default async function handler(req: any, res: any) {
  if (bootstrapError) {
    res.status(500).json({ success: false, error: bootstrapError });
    return;
  }

  if (!initialized) {
    try {
      await bootstrap();
      initialized = true;
    } catch (error: any) {
      bootstrapError = error?.message || 'Server initialization failed';
      res.status(500).json({ success: false, error: bootstrapError });
      return;
    }
  }

  app(req, res);
}
