import Admin from '../models/Admin.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';
import { signTokens, verifyRefreshToken } from '../services/authService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 'Email and password are required', 400);

    const admin = await Admin.findOne({ email });
    if (!admin) return sendError(res, 'Invalid credentials', 401);

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return sendError(res, 'Invalid credentials', 401);

    const { accessToken, refreshToken } = signTokens(admin);
    admin.refreshToken = refreshToken;
    admin.lastLogin = new Date();
    await admin.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return sendSuccess(res, { admin, accessToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return sendError(res, 'Refresh token missing', 401);

    const decoded = verifyRefreshToken(token);
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.refreshToken !== token) return sendError(res, 'Invalid refresh token', 401);

    const { accessToken, refreshToken } = signTokens(admin);
    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'lax' });
    return sendSuccess(res, { accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const decoded = verifyRefreshToken(token);
      const admin = await Admin.findById(decoded.id);
      if (admin) {
        admin.refreshToken = null;
        await admin.save();
      }
    }
    res.clearCookie('refreshToken');
    return sendSuccess(res, { message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    return sendSuccess(res, { admin: req.admin });
  } catch (error) {
    next(error);
  }
};
