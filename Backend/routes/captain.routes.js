const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const {
  validateCaptainSignup,
  validateRequest,
} = require("../validators/captain.validator");

router
  .route("/register")
  .post(
    validateCaptainSignup,
    validateRequest,
    captainController.createCaptain
  );
// router.route('/login').post(captainController.login);
// router.route('/profile').get(captainController.captainProfile);
// router.route('/logout').post(captainController.logout);

module.exports = router;
