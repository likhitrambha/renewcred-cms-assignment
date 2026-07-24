import express from 'express';
import { createMedia, deleteMedia, listMedia, upload } from '../controllers/mediaController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, listMedia);
router.post('/', protect, upload.single('file'), createMedia);
router.delete('/:id', protect, deleteMedia);

export default router;
