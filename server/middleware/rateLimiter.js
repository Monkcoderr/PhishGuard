const rateLimit = require('express-rate-limit');

// General limiter for all API requests
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per window
  message: { success: false, message: 'Too many login attempts, please try again later' }
});

// Limiter for email scans to prevent resource abuse
const scanLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // Limit to 15 scans per hour
  message: { success: false, message: 'Scan limit reached. Please try again in an hour.' },
  keyGenerator: (req) => req.user?.id || req.ip
});

module.exports = {
  generalLimiter,
  authLimiter,
  scanLimiter
};
