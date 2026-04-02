## Aviyukt NGO - Full Stack Project

This repository contains the Aviyukt NGO web platform:
- `frontend`: React + Vite client
- `BackEnd`: Node.js + Express + MongoDB API

## Project Structure

```text
Aviyuktngo/
|- frontend/
|  |- src/
|  |- package.json
|  |- vercel.json
|- BackEnd/
|  |- src/
|  |- package.json
|- README.md
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, Mongoose, JWT, Google OAuth, Razorpay
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## 1) Backend Setup

```bash
cd BackEnd
npm install
```

Create `BackEnd/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
FRONTEND_URLS=http://localhost:5173,https://your-frontend-domain.com
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run backend:

```bash
npm start
```

Backend runs on `http://localhost:3000`.

## 2) Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Run frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Frontend Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## API Base Routes

- `/contact` -> contact capture
- `/razorpay` -> payment create/verify/history
- `/api/auth/google` -> Google sign-in/up (token verification + JWT cookie)
- `/api/auth/me` -> current authenticated user
- `/api/auth/logout` -> clear auth cookie

## Authentication (Google Only)

- Email/password login is removed.
- Signup/register/OTP flows are removed.
- Users can authenticate only via Google OAuth.
- Backend verifies Google ID token before issuing JWT.
- JWT is stored in an HTTP-only cookie.

## Google Cloud Console Setup

1. Go to Google Cloud Console and create/select a project.
2. Open `APIs & Services` -> `OAuth consent screen` and configure app details.
3. Add required scopes: `email`, `profile`, `openid`.
4. Open `Credentials` -> `Create Credentials` -> `OAuth Client ID`.
5. Choose `Web application`.
6. Add Authorized JavaScript origins:
   - `http://localhost:5173`
   - your production frontend URL
7. Copy the generated Client ID.
8. Set:
   - Backend: `GOOGLE_CLIENT_ID`
   - Frontend: `VITE_GOOGLE_CLIENT_ID`

## Notes

- CORS in backend currently allows:
  - origins provided in `FRONTEND_URLS`
- For local development, keep `VITE_API_BASE_URL=http://localhost:3000`.
- Do not commit `.env` files.

## Deployment

- Frontend: Vercel (`frontend/vercel.json` includes SPA rewrite)
- Backend: Any Node host (Render/Railway/etc.) with environment variables configured




Object of service
1)	Agriculture
2)	Medicine
3)	Health
4)	Placement
5)	Education
6)	Rental work
7)	Property ( purchase, loan, Registry, mutation)
8)	Insurance (Legal Add court case work)
9)	House Hold service provide
