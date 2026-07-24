import Setting from '../models/Setting.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

export const getSettings = async (_req, res, next) => {
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      const created = await Setting.create({});
      return sendSuccess(res, created);
    }
    return sendSuccess(res, settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
    return sendSuccess(res, settings);
  } catch (error) {
    next(error);
  }
};
