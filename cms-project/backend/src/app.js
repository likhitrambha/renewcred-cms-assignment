import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/environment.js';
import authRoutes from './routes/auth.routes.js';
import pageRoutes from './routes/page.routes.js';
import mediaRoutes from './routes/media.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import categoryRoutes from './routes/category.routes.js';
import tagRoutes from './routes/tag.routes.js';
import navigationRoutes from './routes/navigation.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors({ origin: [env.clientUrl, env.adminUrl], credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

app.get('/api/v1/health', (_req, res) => {
  res.json({ ok: true, service: 'cms-backend' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pageRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/navigation', navigationRoutes);

app.use(errorHandler);

export default app;
