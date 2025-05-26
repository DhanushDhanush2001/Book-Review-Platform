const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

// Check if user is authenticated
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler('User not authorized, no token', 401));
  }

  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler('User not found', 404));
  }

  next();
});


// Allow access only to admin users
exports.authorizeAdmin = () => {
  return (req, res, next) => {
    console.log(req.user.isAdmin,"req.user.isAdmin")
    if (!req.user || !req.user.isAdmin) {
      return next(new ErrorHandler('Access denied. Admins only.', 403));
    }
    next();
  };
};

