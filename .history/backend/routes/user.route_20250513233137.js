const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user.controller");
const checkAuthorization = require("../middlewares/auth.middleware");
const checkRegister = require("../middlewares/register.middleware");
const checkLogin = require("../middlewares/login.middleware");

const router = express.Router();
router.route("/register").post(checkRegister, registerUser);
router.route("/login").post(checkLogin, loginUser);
router.route("/my-profile").get(checkAuthorization, getUserProfile);

module.exports = router;
