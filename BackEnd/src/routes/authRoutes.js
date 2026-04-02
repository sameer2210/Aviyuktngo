const express = require('express');
const { googleAuth, getCurrentUser, logout, getGoogleClientId } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/google-client-id', getGoogleClientId);
router.post('/google', googleAuth);
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', logout);

module.exports = router;
