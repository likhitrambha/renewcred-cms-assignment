import Navigation from '../models/Navigation.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

export const listNavigation = async (_req, res, next) => {
  try {
    const navigations = await Navigation.find().sort({ createdAt: -1 });
    return sendSuccess(res, navigations);
  } catch (error) {
    next(error);
  }
};

export const createNavigation = async (req, res, next) => {
  try {
    const navigation = await Navigation.create(req.body);
    return sendSuccess(res, navigation, 201);
  } catch (error) {
    next(error);
  }
};

export const updateNavigation = async (req, res, next) => {
  try {
    const navigation = await Navigation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!navigation) return sendError(res, 'Navigation not found', 404);
    return sendSuccess(res, navigation);
  } catch (error) {
    next(error);
  }
};

export const deleteNavigation = async (req, res, next) => {
  try {
    const navigation = await Navigation.findByIdAndDelete(req.params.id);
    if (!navigation) return sendError(res, 'Navigation not found', 404);
    return sendSuccess(res, { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
