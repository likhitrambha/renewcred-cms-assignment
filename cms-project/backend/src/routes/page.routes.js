import express from 'express';
import { createPage, deletePage, getPage, listPages, updatePage } from '../controllers/pageController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listPages);
router.get('/:slug', getPage);
router.post('/', protect, createPage);
router.put('/:id', protect, updatePage);
router.delete('/:id', protect, deletePage);

export default router;
