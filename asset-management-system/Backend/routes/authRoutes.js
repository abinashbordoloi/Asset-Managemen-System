const express = require('express');
const router = express.Router();

// Import the authentication controller
const authController = require('../controllers/authController');

// Define the authentication routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

module.exports = router;
