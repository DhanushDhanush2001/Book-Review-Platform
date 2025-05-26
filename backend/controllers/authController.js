const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already registered!", 400));
  }

  const user = await User.create({ userName, email, password });

  sendToken(user, 201, res, "User registered successfully");
});

// Login User
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res, "Logged in successfully");
});

// Get User Profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { userName, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { userName, email },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});
