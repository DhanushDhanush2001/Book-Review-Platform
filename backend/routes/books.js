const express = require('express');
const {getBooks,newBook,getSingleBook} = require('../controllers/bookController');
const { isAuthenticatedUser,authorizeAdmin } = require('../middleware/auth');
const router = express.Router();

router.route('/getbooks').get(getBooks);
router.route('/getsinglebook/:id').get(getSingleBook);
router.route('/addbooks').post(isAuthenticatedUser,newBook)

module.exports = router;