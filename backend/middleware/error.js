const ErrorHandler = require('../utils/errorHandler');

exports.errorMiddleware = (err, req, res, next) => {
    // Default message and status code
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handle CastError (MongoDB specific)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);  // Create a new instance of ErrorHandler
    }

    // Handle duplicate key error (MongoDB specific)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again!`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, try again!`;
        err = new ErrorHandler(message, 400);
    }

    // Send the response with the error message
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
