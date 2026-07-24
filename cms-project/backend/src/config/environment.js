import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cms',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:3001',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
  defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL || 'admin@cms.com',
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD || 'Password123@'
};
