const httpStatus = require('http-status');
const User =require('../models/user.model');
const ApiError = require('../utils/ApiError');


exports.createUser = async (userData) => {
    if (await User.isEmailTaken(userData.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const hashedPassword = await User.hashPassword(userData.password);
    const user = new User({
        ...userData,
        password: hashedPassword
    });
    return await user.save();
};
