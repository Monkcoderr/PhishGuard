const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  emailContent: {
    type: String,
    required: true,
    maxlength: 15000
  },
  emailHash: {
    type: String,
    index: true
  },
  phishingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  verdict: {
    type: String,
    enum: ['safe', 'suspicious', 'dangerous'],
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical']
  },
  impersonating: {
    type: String,
    default: 'None'
  },
  scammerGoal: {
    type: String
  },
  summary: {
    type: String
  },
  category: {
    type: String,
    enum: ['banking', 'shopping', 'lottery', 'job_offer', 'tech_support', 'government', 'romance', 'cryptocurrency', 'delivery', 'subscription', 'other'],
    default: 'other'
  },
  redFlags: [{
    flag: String,
    evidence: String,
    severity: {
      type: String,
      enum: ['critical', 'warning', 'info']
    },
    explanation: String
  }],
  manipulationTactics: [String],
  recommendations: [String],
  highlightedParts: [{
    text: String,
    reason: String,
    severity: {
      type: String,
      enum: ['critical', 'warning', 'info']
    }
  }],
  legitimateVersion: {
    type: String
  },
  reportedToCommunity: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ emailHash: 1 });

module.exports = mongoose.model('Scan', scanSchema);
