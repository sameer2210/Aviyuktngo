# Aviyukt NGO - Full Stack Platform

Official web platform for Aviyukt NGO with:


## Project Overview

Aviyukt NGO is a community-focused platform designed to present social initiatives and support operational workflows like onboarding, donations, and user profile access.


The platform supports:
- Google-only authentication
- Donation and membership payments via Razorpay
- Payment verification and history lookup
- Contact email capture
- NGO service showcase pages and team/credits sections


## Core Features

- Google OAuth sign-in (no email/password auth flow)
- Session handling with JWT in HTTP-only cookies
- Donation flow and membership payment flow
- Razorpay order creation and signature verification
- Receipt generation (PDF) on the frontend after successful payment
- Payment history lookup by Aadhaar number
- Contact/volunteer form email capture
- Service pages across agriculture, health, education, legal/insurance, and household support
- Responsive UI with React Router-based navigation

## Services Covered

The platform currently highlights the following service categories:

1. Agriculture
2. Medicine
3. Health
4. Placement
5. Education
6. Rental Work
7. Property (Purchase, Loan, Registry, Mutation)
8. Insurance (Legal and Court Case Work)
9. Household Services


## Repository Structure

```text
Aviyuktngo/
|- frontend/
|  |- src/
|  |  |- Components/
|  |  |- context/
|  |  |- data/
|  |  |- instant/
|  |  |- pages/
|  |  |- routes/
|  |- package.json
|  |- vite.config.js
|  |- vercel.json
|- BackEnd/
|  |- src/
|  |  |- controller/
|  |  |- db/
|  |  |- middleware/
|  |  |- models/
|  |  |- routes/
|  |  |- app.js
|  |- server.js
|  |- package.json
|- README.md
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Razorpay test/live keys
- Google OAuth Client ID

### 1) Backend Setup

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
NODE_ENV=development
```

Start backend:

```bash
npm start
```

Backend default URL: `http://localhost:3000`

### 2) Frontend Setup

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

Start frontend:

```bash
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Environment Variables

### Backend (`BackEnd/.env`)

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No | API server port (default: `3000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT signing secret |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth token audience verification |
| `FRONTEND_URLS` | Recommended | Comma-separated CORS allowlist additions |
| `RAZORPAY_KEY_ID` | Yes (payments) | Razorpay key ID for order creation |
| `RAZORPAY_KEY_SECRET` | Yes (payments) | Razorpay key secret for signature verification |
| `NODE_ENV` | Recommended | Cookie behavior (`production` enables secure cookie flags) |

Default CORS frontend origins already included in code:
- `http://localhost:5173`
- `https://aviyuktngo.vercel.app`
- `https://www.aviyuktngo.org`

### Frontend (`frontend/.env`)

| Variable | Required | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend base URL for API calls |
| `VITE_GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID (if omitted, frontend fetches from backend) |
| `VITE_RAZORPAY_KEY_ID` | Yes (payments) | Razorpay publishable key used in checkout |

## Scripts

### Frontend (`frontend`)

```bash
npm run dev      # start Vite dev server
npm run build    # build production bundle
npm run lint     # lint source
npm run preview  # preview production build
```

### Backend (`BackEnd`)

```bash
npm start        # run server.js
```

## API Reference

Base URL (local): `http://localhost:3000`

### Auth Routes (`/api/auth`)

| Method | Route | Description |
|---|---|---|
| `GET` | `/google-client-id` | Returns configured Google client ID |
| `POST` | `/google` | Verifies Google ID token, upserts user, sets auth cookie |
| `GET` | `/me` | Returns current logged-in user (requires token/cookie) |
| `POST` | `/logout` | Clears auth cookie |

### Contact Routes (`/contact`)

| Method | Route | Description |
|---|---|---|
| `POST` | `/email` | Stores contact email in DB |

### Payment Routes (`/razorpay`)

| Method | Route | Description |
|---|---|---|
| `POST` | `/paymentcreate` | Creates Razorpay order and stores pending payment |
| `POST` | `/paymentverify` | Verifies Razorpay signature and marks payment completed |
| `POST` | `/payHistory` | Returns payment history by Aadhaar number |

## Data Models

### `users` collection
- `name` (required)
- `email` (required, unique)
- `profilePic`
- `googleId` (unique, sparse)
- timestamps

### `payment` collection
- `orderId` (required)
- `paymentId`
- `signature`
- `amount` (required)
- `currency` (required)
- donor/member details: `name`, `email`, `adhar`, `address`, `occupation`, `street`, `city`, `state`, `pincode`, `gender`
- `status` (`pending`/`completed`)
- timestamps

### `Contact` collection
- `email` (required)
- timestamps

## Authentication and Security

- Google-only authentication flow
- Backend verifies Google ID token audience with `GOOGLE_CLIENT_ID`
- JWT token is issued and stored in HTTP-only cookie (`token`)
- Auth middleware accepts cookie token or `Authorization: Bearer <token>`
- In production, cookie settings use `secure: true` and `sameSite: None`
- CORS is origin-restricted using defaults + `FRONTEND_URLS`

Important production recommendations:
- Use HTTPS for frontend and backend
- Use strong `JWT_SECRET`
- Never commit `.env` files
- Protect and rotate Razorpay keys as needed

## Deployment Notes

- Frontend is Vercel-ready (`frontend/vercel.json` has SPA rewrite)
- Backend can be deployed on Render, Railway, VPS, or any Node host
- Ensure all required env variables are configured in deployment platform
- Keep frontend `VITE_API_BASE_URL` pointed to deployed backend URL

## Project and Developer Team

### Organization Leadership

- President: Narayan Kumar Shrivastav
- Vice President: Sashi Mishra
- Secretary: Brajesh Pratap Singh
- Joint Secretary: Dr. Shukranti Shrivastava
- Treasurer: Sapna Shrivastava
- Board Member: Awadh Bihari Gautam
- Board Member: Pankaj Kumar Panthi

### Founders and Tech Leadership

- Anand Singh Chouhan - Founder and Visionary
- Ankesh Barhadiya - Co-Founder and Tech Lead
- Sameer Khan - Co-Founder and Tech Lead
- Deepti Lodhi - Co-Founder and Tech Lead

### Developer Contact References (from project credits)

- Sameer Khan
  - Email: `sameerkhan27560@gmail.com`
  - LinkedIn: `https://www.linkedin.com/in/sameer-khan2210/`

### Public NGO Contact

- Email: `aviyuktngo@gmail.com`
- Phone: `+91 8770321854`
- Location: Bhopal, India

Social links:
- Instagram: `https://www.instagram.com/aviyukt_samaja_sevi_sansthan`
- Facebook: `https://www.facebook.com/share/18ykXqs2ca/`
- YouTube: `http://www.youtube.com/@Aviyuktngo`

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make and test changes locally
4. Open a pull request with clear description

Recommended before PR:
- Run frontend linting
- Validate auth flow
- Validate payment create + verify in Razorpay test mode

## Troubleshooting

- Google login not appearing:
  - Check `GOOGLE_CLIENT_ID` in backend and/or `VITE_GOOGLE_CLIENT_ID` in frontend
- Unauthorized on `/api/auth/me`:
  - Check cookie settings, CORS config, and `withCredentials` behavior
- Payment create failing:
  - Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in backend
- Payment verify failing:
  - Ensure correct signature and order/payment IDs are sent
- No payment history:
  - Aadhaar must be exactly 12 digits

## Notes

- Backend currently uses `npm start` only (no nodemon script configured).
- No automated tests are configured yet in this repository.
