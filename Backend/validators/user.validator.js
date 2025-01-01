const { check, validationResult } = require('express-validator');

const validateUserSignup = [
    check('fullname.firstname')
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

    check('fullname.lastname')
        .optional()
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Valid email is required')
        .isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUserSignup, validateRequest };
