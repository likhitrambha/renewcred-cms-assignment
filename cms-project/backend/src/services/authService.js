import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

export const signTokens = (admin) => {
  const accessToken = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
  const refreshToken = jwt.sign({ id: admin._id }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn
  });
  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};
