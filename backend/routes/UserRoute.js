const express = require('express');
const { getUserProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, getUserProfile);

module.exports = router;
