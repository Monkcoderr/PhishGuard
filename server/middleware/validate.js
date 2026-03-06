const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegister = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation rules for login
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Validation rules for email scan
const validateScan = [
  body('emailContent')
    .trim()
    .isLength({ min: 10, max: 15000 })
    .withMessage('Email content must be between 10 and 15,000 characters')
];

// Validation rules for community reports
const validateReport = [
  body('scanId').isMongoId().withMessage('Valid scan ID is required')
];

/**
 * Handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateScan,
  validateReport,
  handleValidationErrors
};
