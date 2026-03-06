const express = require('express');
const router = express.Router();
const { 
  analyzeEmail, 
  getScanHistory, 
  getScanById, 
  deleteScan, 
  getMyStats 
} = require('../controllers/scanController');
const { protect } = require('../middleware/auth');
const { scanLimiter } = require('../middleware/rateLimiter');
const { validateScan, handleValidationErrors } = require('../middleware/validate');

/**
 * @route   POST /api/scan/analyze
 * @desc    Analyze email for phishing
 * @access  Private
 */
router.post('/analyze', [protect, scanLimiter, validateScan, handleValidationErrors], analyzeEmail);

/**
 * @route   GET /api/scan/history
 * @desc    Get user scan history
 * @access  Private
 */
router.get('/history', protect, getScanHistory);

/**
 * @route   GET /api/scan/stats/me
 * @desc    Get user platform stats
 * @access  Private
 */
router.get('/stats/me', protect, getMyStats);

/**
 * @route   GET /api/scan/:id
 * @desc    Get single scan details
 * @access  Private
 */
router.get('/:id', protect, getScanById);

/**
 * @route   DELETE /api/scan/:id
 * @desc    Delete a scan
 * @access  Private
 */
router.delete('/:id', protect, deleteScan);

module.exports = router;
