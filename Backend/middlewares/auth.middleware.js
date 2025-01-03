const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { default: status } = require("http-status");
const BlackListToken = require("../models/blacklistToken.model");

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
