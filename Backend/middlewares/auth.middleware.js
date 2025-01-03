const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { default: status } = require("http-status");
const BlackListToken = require("../models/blacklistToken.model");

/**
 * Middleware to authenticate a user based on a token.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 * 
 * @throws {Error} - Throws an error if token verification fails.
 * 
 * @description
 * This middleware function checks for a token in the request cookies or authorization headers.
 * It verifies the token and checks if it is blacklisted. If the token is valid and not blacklisted,
 * it retrieves the user associated with the token and attaches the user object to the request.
 * If any checks fail, it responds with an appropriate unauthorized status and message.
 */
const authUser = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  const isTokenInBlackList = await BlackListToken.findOne({token});
    if(isTokenInBlackList){
        return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized: Invalid token" });
    }
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(status.UNAUTHORIZED).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(status.UNAUTHORIZED).json({
        message: "Unauthorized: Token has expired",
        expiredAt: error.expiredAt, 
      });
    }

    return res.status(status.UNAUTHORIZED).json({
      message: "Unauthorized: Invalid token",
      error: error.message,
    });
  }
};

module.exports = { authUser };
