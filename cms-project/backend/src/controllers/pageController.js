import Page from '../models/Page.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';
import { buildPagePayload } from '../services/pageService.js';
import { BaseRepository } from '../repositories/baseRepository.js';

const pageRepository = new BaseRepository(Page);

export const listPages = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q = '', status, category, tag } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.categories = category;
    if (tag) filter.tags = tag;
    if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { excerpt: { $regex: q, $options: 'i' } }];

    const total = await Page.countDocuments(filter);
    const pages = await Page.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('categories tags createdBy');

    return sendSuccess(res, { pages, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

export const getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).populate('categories tags createdBy');
    if (!page) return sendError(res, 'Page not found', 404);
    return sendSuccess(res, page);
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req, res, next) => {
  try {
    const payload = buildPagePayload(req.body, req.admin?._id);
    const page = await pageRepository.create(payload);
    return sendSuccess(res, page, 201);
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const existing = await Page.findById(req.params.id);
    if (!existing) return sendError(res, 'Page not found', 404);

    const history = existing.versionHistory || [];
    const updatedHistory = [...history, { editedAt: new Date(), title: existing.title, slug: existing.slug }];

    const payload = {
      ...req.body,
      versionHistory: updatedHistory,
      slug: req.body.slug || existing.slug,
      publishedAt: req.body.status === 'published' ? new Date() : existing.publishedAt
    };

    const page = await pageRepository.update(req.params.id, payload);
    return sendSuccess(res, page);
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const page = await pageRepository.delete(req.params.id);
    if (!page) return sendError(res, 'Page not found', 404);
    return sendSuccess(res, { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
