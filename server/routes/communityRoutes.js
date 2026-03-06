const express = require('express');
const router = express.Router();
const { 
  reportScam, 
  getTrending, 
  getPlatformStats, 
  getWeeklyReport 
} = require('../controllers/communityController');
const { protect } = require('../middleware/auth');
const { validateReport, handleValidationErrors } = require('../middleware/validate');

/**
 * @route   POST /api/community/report
 * @desc    Report a scan to the community
 * @access  Private
 */
router.post('/report', [protect, validateReport, handleValidationErrors], reportScam);

/**
 * @route   GET /api/community/trending
 * @desc    Get trending scams
 * @access  Public
 */
router.get('/trending', getTrending);

/**
 * @route   GET /api/community/stats
 * @desc    Get platform-wide statistics
 * @access  Public
 */
router.get('/stats', getPlatformStats);

/**
 * @route   GET /api/community/weekly
 * @desc    Get weekly scam trend report
 * @access  Public
 */
router.get('/weekly', getWeeklyReport);

module.exports = router;
