import Tag from '../models/Tag.js';
import { createSlug } from '../utils/slug.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

export const listTags = async (_req, res, next) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });
    return sendSuccess(res, tags);
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const payload = { ...req.body, slug: req.body.slug || createSlug(req.body.name) };
    const tag = await Tag.create(payload);
    return sendSuccess(res, tag, 201);
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tag) return sendError(res, 'Tag not found', 404);
    return sendSuccess(res, tag);
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return sendError(res, 'Tag not found', 404);
    return sendSuccess(res, { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
