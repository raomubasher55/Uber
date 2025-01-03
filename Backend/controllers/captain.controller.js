const Captain = require('../models/captain.model.js');
const {default :httpStatus} = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { createCaptain } = require('../services/captain.service.js');


exports.createCaptain = catchAsync(async (req, res) => {
    const captain = await createCaptain(req.body);
    const token = captain.generateAuthToken();
    res.status(httpStatus.CREATED).json({ captain, token });
});