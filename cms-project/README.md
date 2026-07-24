# RenewCred CMS

RenewCred CMS is a production-ready content management system built with a Next.js public site, a Next.js admin console, and an Express + MongoDB backend. The platform supports authentication, dynamic page rendering, block-based page editing, SEO metadata, media uploads, and deployment via Docker.

## Stack

- Frontend: Next.js 15, React 19, Redux Toolkit, RTK Query, TypeScript, Tailwind CSS, Axios
- Admin: Next.js 15, React 19, Redux Toolkit, React Hook Form, Zod, TipTap, KaTeX-ready blocks, React Icons
- Backend: Node.js 22, Express.js, MongoDB, Mongoose, JWT, bcryptjs, multer, helmet, morgan, cors, dotenv

## Project Structure

- backend/ - Express API and MongoDB models
- admin/ - Admin dashboard and CMS editor
- frontend/ - Public website consuming backend APIs
- docker-compose.yml - All services

## Environment Variables

Copy .env.example to backend/.env and update the values:

- PORT
- MONGO_URI
- JWT_SECRET
- JWT_REFRESH_SECRET
- JWT_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN
- NODE_ENV
- CLIENT_URL
- ADMIN_URL
- UPLOAD_DIR
- RATE_LIMIT_WINDOW_MS
- RATE_LIMIT_MAX
- DEFAULT_ADMIN_EMAIL
- DEFAULT_ADMIN_PASSWORD

## Installation

### Backend

```bash
cd backend
npm install
cp ../.env.example .env
npm run seed
npm run dev
```

### Admin

```bash
cd admin
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000
- Admin on port 3001

## Seed Data

Default admin credentials:
- Email: admin@cms.com
- Password: Password123@

## API Overview

### Auth
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/logout
- GET /api/v1/auth/me

### Pages
- GET /api/v1/pages
- GET /api/v1/pages/:slug
- POST /api/v1/pages
- PUT /api/v1/pages/:id
- DELETE /api/v1/pages/:id

### Media
- GET /api/v1/media
- POST /api/v1/media
- DELETE /api/v1/media/:id

### Settings
- GET /api/v1/settings
- PUT /api/v1/settings

## Notes

The frontend and admin are built to consume backend APIs only, support dynamic routing, and render CMS-managed content without hardcoded values.
