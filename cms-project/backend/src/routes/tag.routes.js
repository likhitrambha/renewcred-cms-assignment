import express from 'express';
import { createTag, deleteTag, listTags, updateTag } from '../controllers/tagController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listTags);
router.post('/', protect, createTag);
router.put('/:id', protect, updateTag);
router.delete('/:id', protect, deleteTag);

export default router;
