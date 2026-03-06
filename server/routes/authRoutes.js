const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validate');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', [validateRegister, handleValidationErrors], register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user & get token
 * @access  Public
 */
router.post('/login', [authLimiter, validateLogin, handleValidationErrors], login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', protect, getMe);

module.exports = router;
