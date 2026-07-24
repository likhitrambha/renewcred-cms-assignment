import express from 'express';
import { createNavigation, deleteNavigation, listNavigation, updateNavigation } from '../controllers/navigationController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listNavigation);
router.post('/', protect, createNavigation);
router.put('/:id', protect, updateNavigation);
router.delete('/:id', protect, deleteNavigation);

export default router;
