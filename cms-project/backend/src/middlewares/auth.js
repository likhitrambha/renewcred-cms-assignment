import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import Admin from '../models/Admin.js';
import { sendError } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return sendError(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return sendError(res, 'Admin not found', 401);
    }

    req.admin = admin;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};
