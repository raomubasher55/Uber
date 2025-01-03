const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { default: status } = require("http-status");

/**
 * Login a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<User>}
 */
exports.loginUserWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(status.INTERNAL_SERVER_ERROR, 'Invalid credentials');
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(status.UNAUTHORIZED, 'Invalid credentials');
    }
    return user;
  };
  
  
