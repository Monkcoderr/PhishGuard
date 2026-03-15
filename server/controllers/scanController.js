const Scan = require('../models/Scan');
const User = require('../models/User');
const geminiService = require('../services/geminiService');
const { hashEmail, asyncHandler } = require('../utils/helpers');

/**
 * Analyze an email content
 * POST /api/scan/analyze
 */
const analyzeEmail = asyncHandler(async (req, res) => {
  const { emailContent } = req.body;
  const emailHash = hashEmail(emailContent);

  // Call Gemini AI service
  const analysis = await geminiService.analyzeEmail(emailContent);

  // Create scan record
  const scan = await Scan.create({
    userId: req.user.id,
    emailContent,
    emailHash,
    phishingScore: analysis.phishingScore,
    verdict: analysis.verdict,
    riskLevel: analysis.riskLevel,
    impersonating: analysis.impersonating,
    scammerGoal: analysis.scammerGoal,
    summary: analysis.summary,
    category: analysis.category,
    redFlags: analysis.redFlags,
    manipulationTactics: analysis.manipulationTactics,
    recommendations: analysis.recommendations,
    highlightedParts: analysis.highlightedParts,
    legitimateVersion: analysis.legitimateVersion
  });

  // Update user stats
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { 
      totalScans: 1, 
      ...(analysis.phishingScore >= 50 ? { scamsCaught: 1 } : {}) 
    }
  });

  res.status(201).json({ success: true, scan });
});

// setup user

await User.findByIdAndUpdate(req.user.id,{
    $inc: { 
      totalScans: 1, $inc: { 
      totalScans: 1, 
      ...(analysis.phishingScore >= 50 ? { scamsCaught: 1 } : {}) 
    }
  });

/**
 * Get user's scan history
 * GET /api/scan/history
 */
const getScanHistory = asyncHandler(async (req, res) => {
  const parsedPage = parseInt(req.query.page, 10);
  const parsedLimit = parseInt(req.query.limit, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 10;
  const skip = (page - 1) * limit;

  const scans = await Scan.find({ userId: req.user.id })
    .select('-emailContent -highlightedParts -legitimateVersion')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Scan.countDocuments({ userId: req.user.id });

  res.status(200).json({
    success: true,
    scans,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

/**
 * Get single scan by ID
 * GET /api/scan/:id
 */
const getScanById = asyncHandler(async (req, res) => {
  const scan = await Scan.findOne({ _id: req.params.id, userId: req.user.id });

  if (!scan) {
    return res.status(404).json({ success: false, message: 'Scan not found' });
  }

  res.status(200).json({ success: true, scan });
});

/**
 * Delete a scan
 * DELETE /api/scan/:id
 */
const deleteScan = asyncHandler(async (req, res) => {
  const scan = await Scan.findOne({ _id: req.params.id, userId: req.user.id });

  if (!scan) {
    return res.status(404).json({ success: false, message: 'Scan not found' });
  }

  const wasScam = scan.phishingScore >= 50;

  await scan.deleteOne();

  // Update user stats
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { 
      totalScans: -1, 
      ...(wasScam ? { scamsCaught: -1 } : {}) 
    }
  });

  res.status(200).json({ success: true, message: 'Scan deleted successfully' });
});

/**
 * Get user stats
 * GET /api/scan/stats/me
 */
const getMyStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  const scanStats = await Scan.aggregate([
    { $match: { userId: user._id } },
    {
      $group: {
        _id: null,
        avgScore: { $avg: '$phishingScore' },
        totalDangerous: { $sum: { $cond: [{ $eq: ['$verdict', 'dangerous'] }, 1, 0] } },
        totalSuspicious: { $sum: { $cond: [{ $eq: ['$verdict', 'suspicious'] }, 1, 0] } },
        totalSafe: { $sum: { $cond: [{ $eq: ['$verdict', 'safe'] }, 1, 0] } }
      }
    }
  ]);

  const stats = scanStats.length > 0 ? scanStats[0] : {
    avgScore: 0,
    totalDangerous: 0,
    totalSuspicious: 0,
    totalSafe: 0
  };

  res.status(200).json({
    success: true,
    stats: {
      totalScans: user.totalScans,
      scamsCaught: user.scamsCaught,
      ...stats
    }
  });
});

module.exports = {
  analyzeEmail,
  getScanHistory,
  getScanById,
  deleteScan,
  getMyStats
};
