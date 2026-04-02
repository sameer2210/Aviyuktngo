const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contact.routes.js');
const razorpayRoutes = require('./routes/payment.routes.js');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(morgan('tiny'));

const normalizeOrigin = (origin = '') => origin.trim().replace(/\/+$/, '').toLowerCase();

const defaultFrontendOrigins = [
  'http://localhost:5173',
  'https://aviyuktngo.vercel.app',
  'https://www.aviyuktngo.org',
];

// CORS whitelisted origins from .env + defaults
const envFrontendOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',').map((u) => u.trim())
  : [];

const allowedOrigins = new Set(
  [...defaultFrontendOrigins, ...envFrontendOrigins]
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean)
);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser or same-origin requests without Origin header.
    if (!origin) return callback(null, true);

    const normalizedIncomingOrigin = normalizeOrigin(origin);

    if (allowedOrigins.has(normalizedIncomingOrigin)) {
      return callback(null, true);
    }

    // Do not throw server errors for disallowed origins.
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(
  cors(corsOptions)
);
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/contact', contactRoutes);
app.use('/razorpay', razorpayRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
