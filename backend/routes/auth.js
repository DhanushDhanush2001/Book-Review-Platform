const express = require('express');
const {registerUser,login,getUserProfile,updateProfile} = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(login);
router.route('/userprofile/:id').get(isAuthenticatedUser, getUserProfile);
router.route('/updateprofile/:id').put(isAuthenticatedUser, updateProfile);

module.exports = router;
