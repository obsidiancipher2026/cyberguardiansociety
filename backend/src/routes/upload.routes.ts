import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { uploadLimiter } from '../middleware/rateLimiter';
import { upload, optimizeImage, getFileUrl } from '../services/file.service';
import { buildApiResponse, buildErrorResponse } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const router = Router();

router.post(
  '/upload',
  authenticate,
  authorize('manage_settings'),
  uploadLimiter,
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json(buildErrorResponse('No file uploaded'));
        return;
      }

      const file = req.file;
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      if (!allowedExts.includes(ext)) {
        fs.unlinkSync(file.path);
        res.status(400).json(buildErrorResponse('Invalid file extension'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        fs.unlinkSync(file.path);
        res.status(400).json(buildErrorResponse('File too large (max 5MB)'));
        return;
      }

      const magicBytes = Buffer.alloc(4);
      const fd = fs.openSync(file.path, 'r');
      fs.readSync(fd, magicBytes, 0, 4, 0);
      fs.closeSync(fd);

      const isValidImage =
        (magicBytes[0] === 0xFF && magicBytes[1] === 0xD8) ||
        (magicBytes[0] === 0x89 && magicBytes[1] === 0x50 && magicBytes[2] === 0x4E && magicBytes[3] === 0x47) ||
        (magicBytes[0] === 0x47 && magicBytes[1] === 0x49 && magicBytes[2] === 0x46) ||
        (magicBytes[0] === 0x52 && magicBytes[1] === 0x49 && magicBytes[2] === 0x46 && magicBytes[3] === 0x46);

      if (!isValidImage) {
        fs.unlinkSync(file.path);
        res.status(400).json(buildErrorResponse('File content does not match image type'));
        return;
      }

      const optimizedFilename = await optimizeImage(file.path, { format: 'webp', quality: 85 });
      const fileUrl = getFileUrl(optimizedFilename);

      res.json(buildApiResponse({ url: fileUrl, filename: optimizedFilename }, 'File uploaded successfully'));
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw error;
    }
  }
);

router.delete(
  '/upload/:filename',
  authenticate,
  authorize('manage_settings'),
  uploadLimiter,
  (req: Request, res: Response): void => {
    const filename = req.params.filename;

    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      res.status(400).json(buildErrorResponse('Invalid filename'));
      return;
    }

    const uploadDir = path.resolve(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json(buildErrorResponse('File not found'));
      return;
    }

    fs.unlinkSync(filePath);
    res.json(buildApiResponse(null, 'File deleted successfully'));
  }
);

export default router;
