import Category from '../models/Category.js';
import { createSlug } from '../utils/slug.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

export const listCategories = async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return sendSuccess(res, categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const payload = { ...req.body, slug: req.body.slug || createSlug(req.body.name) };
    const category = await Category.create(payload);
    return sendSuccess(res, category, 201);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return sendError(res, 'Category not found', 404);
    return sendSuccess(res, category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return sendError(res, 'Category not found', 404);
    return sendSuccess(res, { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
