const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { registerUser } = require('../controllers/user.controller');
const { validateUserSignup, validateRequest } = require('../validators/user.validator');


router.route('/register').post(
    validateUserSignup,
    validateRequest,
    registerUser
)



module.exports = router;