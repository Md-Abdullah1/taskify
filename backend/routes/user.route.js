const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/user.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();
router.route('/register', registerUser);
router.route('/login', loginUser);
router.route('/me',protect,getUserProfile)

module.exports = router;
