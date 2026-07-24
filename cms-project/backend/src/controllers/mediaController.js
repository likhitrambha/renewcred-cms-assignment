import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import Media from '../models/Media.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });

export const listMedia = async (_req, res, next) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    return sendSuccess(res, media);
  } catch (error) {
    next(error);
  }
};

export const createMedia = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 'File is required', 400);
    const entry = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`,
      uploadedBy: req.admin?._id
    });
    return sendSuccess(res, entry, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return sendError(res, 'Media not found', 404);
    await media.deleteOne();
    return sendSuccess(res, { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
