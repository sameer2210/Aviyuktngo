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
- Backend: Node.js, Express, Mongoose, JWT, Nodemailer, Razorpay
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
JWT_SEC=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
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

- `/user` -> signup/login/otp/validate
- `/profile` -> user profile + logout
- `/contact` -> contact capture
- `/razorpay` -> payment create/verify/history
- `/api/auth` -> forgot-password OTP flow

## Notes

- CORS in backend currently allows:
  - `http://localhost:5173`
  - `https://aviyuktngoavn.vercel.app`
  - `https://www.aviyuktngo.org`
- For local development, keep `VITE_API_BASE_URL=http://localhost:3000`.
- Do not commit `.env` files.

## Deployment

- Frontend: Vercel (`frontend/vercel.json` includes SPA rewrite)
- Backend: Any Node host (Render/Railway/etc.) with environment variables configured
