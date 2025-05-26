const Book = require('../models/bookModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

// Get all books with search, filter, pagination
exports.getBooks = catchAsyncError(async (req, res, next) => {
  const resultPerPage = parseInt(req.query.limit) || 10;

  const apiFeatures = new APIFeatures(Book.find(), req.query)
    .search()
    .filter()
    .paginate(resultPerPage);

  const books = await apiFeatures.query;
  const total = await Book.countDocuments();

  res.status(200).json({
    success: true,
    data: books,
    pagination: {
      total,
      page: parseInt(req.query.page) || 1,
      limit: resultPerPage,
      totalPages: Math.ceil(total / resultPerPage),
    },
  });
});

// Add a new book (role check removed)
exports.newBook = catchAsyncError(async (req, res, next) => {
  const { title, author, description, genre } = req.body;

  if (!title || !author || !description || !genre) {
    return res.status(400).json({
      success: false,
      message: 'All fields (title, author, description, genre) are required.'
    });
  }

  const book = new Book({ title, author, description, genre });
  await book.save();

  res.status(201).json({
    success: true,
    message: 'Book added successfully.',
    book
  });
});

// Get single book by ID with reviews populated
exports.getSingleBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler('Book not found!', 404));
  }

  res.status(200).json({
    success: true,
    book
  });
});
