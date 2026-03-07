const CommunityReport = require('../models/CommunityReport');
const Scan = require('../models/Scan');
const User = require('../models/User');
const ScamTrend = require('../models/ScamTrend');
const { getWeekId, asyncHandler } = require('../utils/helpers');

/**
 * Report a scan as a scam to the community
 * POST /api/community/report
 */
const reportScam = asyncHandler(async (req, res) => {
  const { scanId } = req.body;

  const scan = await Scan.findOne({ _id: scanId, userId: req.user.id });

  if (!scan) {
    return res.status(404).json({ success: false, message: 'Scan not found' });
  }

  if (scan.reportedToCommunity) {
    return res.status(400).json({ success: false, message: 'Already reported' });
  }

  let report = await CommunityReport.findOne({ emailHash: scan.emailHash });

  if (report) {
    // Update existing report
    const newReportCount = report.reportCount + 1;
    const newAvgScore = (report.avgPhishingScore * report.reportCount + scan.phishingScore) / newReportCount;
    
    report.reportCount = newReportCount;
    report.avgPhishingScore = newAvgScore;
    report.lastReported = Date.now();
    
    if (!report.reporters.some((reporterId) => reporterId.toString() === req.user.id.toString())) {
      report.reporters.push(req.user.id);
    }

    if (newReportCount >= 5) {
      report.status = 'confirmed_scam';
    }

    await report.save();
  } else {
    // Create new report
    report = await CommunityReport.create({
      emailHash: scan.emailHash,
      category: scan.category,
      impersonating: scan.impersonating,
      reportCount: 1,
      avgPhishingScore: scan.phishingScore,
      sampleRedFlags: scan.redFlags.map(f => f.flag),
      sampleSubject: 'Suspected Scam', // Ideally we'd have subject from emailContent
      status: 'reported',
      reporters: [req.user.id]
    });
  }

  // Mark scan as reported
  scan.reportedToCommunity = true;
  await scan.save();

  res.status(200).json({ success: true, message: 'Scam reported to community. Thank you!' });
});

/**
 * Get trending scams
 * GET /api/community/trending
 */
const getTrending = asyncHandler(async (req, res) => {
  const trending = await CommunityReport.find()
    .sort({ reportCount: -1 })
    .limit(10)
    .select('-reporters');

  res.status(200).json({ success: true, trending });
});

/**
 * Get platform-wide statistics
 * GET /api/community/stats
 */
const getPlatformStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalScans, totalDangerous, totalReports] = await Promise.all([
    User.countDocuments(),
    Scan.countDocuments(),
    Scan.countDocuments({ verdict: 'dangerous' }),
    CommunityReport.countDocuments()
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalScans,
      scamsDetected: totalDangerous,
      communityReports: totalReports
    }
  });
});

/**
 * Get weekly scam trend report
 * GET /api/community/weekly
 */
const getWeeklyReport = asyncHandler(async (req, res) => {
  const weekId = getWeekId();
  
  let weeklyReport = await ScamTrend.findOne({ weekId });

  if (!weeklyReport) {
    // Aggregate data for the current week if report doesn't exist
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() + 6) % 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const scansThisWeek = await Scan.find({
      createdAt: { $gte: startOfWeek }
    });

    if (scansThisWeek.length > 0) {
      const scamsDetected = scansThisWeek.filter(s => s.phishingScore >= 50).length;
      const avgScore = scansThisWeek.reduce((acc, s) => acc + s.phishingScore, 0) / scansThisWeek.length;
      
      // Basic danger level calculation
      let dangerLevel = 'low';
      if (scamsDetected > 50) dangerLevel = 'critical';
      else if (scamsDetected > 20) dangerLevel = 'high';
      else if (scamsDetected > 10) dangerLevel = 'moderate';

      weeklyReport = await ScamTrend.create({
        weekId,
        weekStart: startOfWeek,
        totalScans: scansThisWeek.length,
        scamsDetected,
        safeDetected: scansThisWeek.length - scamsDetected,
        avgScore,
        dangerLevel
      });
    } else {
      // Return a skeleton report if no scans yet
      return res.status(200).json({
        success: true,
        weeklyReport: {
          weekId,
          totalScans: 0,
          scamsDetected: 0,
          dangerLevel: 'low'
        }
      });
    }
  }

  res.status(200).json({ success: true, weeklyReport });
});

module.exports = {
  reportScam,
  getTrending,
  getPlatformStats,
  getWeeklyReport
};
