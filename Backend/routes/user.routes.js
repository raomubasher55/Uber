const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  userProfile,
  logout,
} = require("../controllers/user.controller");
const {
  validateUserSignup,
  validateRequest,
  validateUserLogin,
} = require("../validators/user.validator");
const { authUser } = require("../middlewares/auth.middleware");

router
  .route("/register")
  .post(validateUserSignup, validateRequest, registerUser);

router.route("/login").post(validateUserLogin, validateRequest, login);

router.route("/profile").get(authUser, userProfile);

router.route("/logout").get(authUser , logout );

module.exports = router;
