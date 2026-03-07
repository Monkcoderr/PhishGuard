const mongoose = require('mongoose');

const scamTrendSchema = new mongoose.Schema({
  weekId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  weekStart: Date,
  weekEnd: Date,
  totalScans: {
    type: Number,
    default: 0
  },
  scamsDetected: {
    type: Number,
    default: 0
  },
  safeDetected: {
    type: Number,
    default: 0
  },
  avgScore: Number,
  topCategories: [{
    category: String,
    count: Number,
    percentage: Number
  }],
  topImpersonated: [{
    brand: String,
    count: Number
  }],
  newPatterns: [String],
  dangerLevel: {
    type: String,
    enum: ['low', 'moderate', 'high', 'critical'],
    default: 'low'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ScamTrend', scamTrendSchema);
