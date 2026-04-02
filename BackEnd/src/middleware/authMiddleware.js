const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SEC;

const authMiddleware = (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const bearerToken = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;
    const token = req.cookies.token || bearerToken;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized. Token expired.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;

