const {check , body, validationResult} = require('express-validator');

exports.validateCaptainSignup = [
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

    check('vehicle.color')
        .notEmpty().withMessage('Color is required')
        .isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    check('vehicle.plate')
        .notEmpty().withMessage('Plate is required')
        .isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    check('vehicle.capacity')
        .notEmpty().withMessage('Capacity is required')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1 characters long'),
    check('vehicle.vehicleType')
        .notEmpty().withMessage('Vehicle type is required')
        .isIn(['motorcycle', 'car', 'auto']).withMessage('Invalid vehicle type'), 
];

exports.validateCaptainLogin = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Valid email is required'),

    check('password')
        .notEmpty().withMessage('Password is required')
];


exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};