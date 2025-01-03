const Captain = require('../models/captain.model.js');
const {default :httpStatus} = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const BlackListToken = require('../models/blacklistToken.model');
const { createCaptain, loginCaptainWithEmailAndPassword } = require('../services/captain.service.js');


exports.createCaptain = catchAsync(async (req, res) => {
    const captain = await createCaptain(req.body);
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(httpStatus.CREATED).json({ captain, token });
});


exports.loginCaptain = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const captain = await loginCaptainWithEmailAndPassword(email, password);
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(httpStatus.OK).send({ captain, token });
});


exports.getCaptain = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).json(req.captain);
});

exports.logout = catchAsync(async (req, res) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    await BlackListToken.create({ token });

    res.clearCookie("token");
    res.status(httpStatus.OK).send("Logged out successfully");
});