const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// GET all reviews for a book
exports.findReviews = catchAsyncError(async (req, res, next) => {
  const { bookId } = req.params; // <-- FIXED: use params, not query

  const reviews = await Review.find({ bookId }).populate('userId', 'userName');

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// POST a new review (for separate review collection)
exports.postReview = catchAsyncError(async (req, res, next) => {
  const { bookId, reviewText, rating } = req.body;

  if (!bookId || !reviewText || rating == null) {
    return next(new ErrorHandler("Book ID, review text and rating are required", 400));
  }

  const existingReview = await Review.findOne({
    bookId,
    userId: req.user.id,
  });

  if (existingReview) {
    // Update the existing review
    existingReview.reviewText = reviewText;
    existingReview.rating = rating;
    await existingReview.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: existingReview,
    });
  }

  // New review
  const review = await Review.create({
    userId: req.user.id,
    bookId,
    reviewText,
    rating,
  });

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review,
  });
});
