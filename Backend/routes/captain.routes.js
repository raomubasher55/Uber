const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const {
  validateCaptainSignup,
  validateRequest,
  validateCaptainLogin,
} = require("../validators/captain.validator");
const { authCaptain } = require("../middlewares/auth.middleware");

router
  .route("/register")
  .post(
    validateCaptainSignup,
    validateRequest,
    captainController.createCaptain
  );

router
    .route("/login")
    .post(validateCaptainLogin, validateRequest, captainController.loginCaptain);


router
  .route("/profile")
  .get(authCaptain ,  captainController.getCaptain);

router
    .route("/logout")
    .get(authCaptain, captainController.logout);

    
module.exports = router;
