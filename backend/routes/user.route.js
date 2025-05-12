const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/user.controller');
const protect = require('../middlewares/auth.middleware');
const checkRegister = require('../middlewares/register.middleware')

const router = express.Router();
router.route('/register').post(checkRegister,registerUser);
router.route('/login').post(loginUser);
router.route('/me',protect,getUserProfile)

module.exports = router;
