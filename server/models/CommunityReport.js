const mongoose = require('mongoose');

const communityReportSchema = new mongoose.Schema({
  emailHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  category: {
    type: String,
    enum: ['banking', 'shopping', 'lottery', 'job_offer', 'tech_support', 'government', 'romance', 'cryptocurrency', 'delivery', 'subscription', 'other']
  },
  impersonating: {
    type: String
  },
  reportCount: {
    type: Number,
    default: 1
  },
  avgPhishingScore: {
    type: Number
  },
  sampleRedFlags: [String],
  sampleSubject: {
    type: String
  },
  status: {
    type: String,
    enum: ['reported', 'confirmed_scam', 'false_positive'],
    default: 'reported'
  },
  reporters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  firstReported: {
    type: Date,
    default: Date.now
  },
  lastReported: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

communityReportSchema.index({ reportCount: -1 });
communityReportSchema.index({ category: 1 });
communityReportSchema.index({ lastReported: -1 });

module.exports = mongoose.model('CommunityReport', communityReportSchema);
