class ApiError extends Error {
  /**
   * Custom error class for API errors
   * @param {number} statusCode - The HTTP status code of the error
   * @param {string} message - The error message
   * @param {boolean} isOperational - Flag indicating if the error is operational (default: true)
   * @param {string} stack - The error stack (optional)
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
