import Page from '../models/Page.js';
import { createSlug } from '../utils/slug.js';

export const buildPagePayload = (payload, adminId) => {
  const slug = payload.slug || createSlug(payload.title);
  return {
    ...payload,
    slug,
    createdBy: adminId,
    versionHistory: payload.versionHistory || []
  };
};

export const listPages = async (query = {}) => {
  return Page.find(query).sort({ createdAt: -1 }).populate('categories tags createdBy');
};
