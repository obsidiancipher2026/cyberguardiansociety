import app, { bootstrap } from '../src/app';

let initialized = false;

export default async function handler(req: any, res: any) {
  if (!initialized) {
    await bootstrap();
    initialized = true;
  }
  app(req, res);
}
