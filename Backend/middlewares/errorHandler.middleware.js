// middlewares/errorHandler.js
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  // Handle other types of errors (e.g., unexpected server errors)
  return res.status(500).json({
    error: err.message,
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
  });
};
module.exports = errorHandler;
