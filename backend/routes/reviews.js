const express = require('express');
const {findReviews,postReview} = require('../controllers/reviewController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route('/getreviews/:bookId').get(findReviews);
router.route('/postreviews').post(isAuthenticatedUser,postReview);

module.exports = router;