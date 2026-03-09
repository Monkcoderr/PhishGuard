const crypto = require('crypto');

/**
 * Hash email content for detection of duplicates
 * @param {string} emailContent 
 * @returns {string}
 */
const hashEmail = (emailContent) => {
  return crypto.createHash('sha256').update(emailContent.trim().toLowerCase()).digest('hex');
};

/**
 * Get the ISO week ID (YYYY-Www)
 * @param {Date} date 
 * @returns {string}
 */
const getWeekId = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
};
/**
 * Async handler to wrap express controllers
 * @param {Function} fn 
 * @returns {Function}
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
const errorHandler = (fn) =>(req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  hashEmail,
  getWeekId,
  asyncHandler
};
