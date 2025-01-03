const User = require("../models/user.model");
const { userService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { default: status } = require("http-status");
const BlackListToken = require("../models/blacklistToken.model");

exports.registerUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = user.generateAuthToken();
    res.status(status.OK).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(status.OK).send({ user, token });
});

exports.userProfile = catchAsync(async(req,res)=>{
    res.status(status.OK).json(req.user);
});

exports.logout = catchAsync(async(req,res)=>{
    res.clearCookie("token");
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    await BlackListToken.create({token});
    res.status(status.OK).send("Logged out successfully");
});