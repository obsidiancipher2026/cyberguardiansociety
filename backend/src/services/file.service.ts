import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../middleware/errorHandler';

const uploadDir = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) ? ext : '.webp';
    const name = `${uuidv4()}${safeExt}`;
    cb(null, name);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.', 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

export interface ImageOptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export async function optimizeImage(
  filePath: string,
  options: ImageOptimizeOptions = {}
): Promise<string> {
  const {
    width = 1200,
    height,
    quality = 85,
    format = 'webp',
  } = options;

  const ext = format === 'jpeg' ? '.jpg' : format === 'png' ? '.png' : '.webp';
  const outputFilename = `${path.basename(filePath, path.extname(filePath))}${ext}`;
  const outputPath = path.join(path.dirname(filePath), outputFilename);

  let pipeline = sharp(filePath).resize(width, height, {
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality });
  } else {
    pipeline = pipeline.webp({ quality });
  }

  await pipeline.toFile(outputPath);

  if (outputPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return outputFilename;
}

export function getFileUrl(filename: string): string {
  return `/uploads/${filename}`;
}
