import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to a readable string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str, length = 60) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Get color tokens based on verdict
 */
export function getVerdictColor(verdict) {
  switch (verdict) {
    case 'safe':
      return { bg: 'bg-safe-100', text: 'text-safe-500', border: 'border-safe-500' };
    case 'suspicious':
      return { bg: 'bg-warning-100', text: 'text-warning-500', border: 'border-warning-500' };
    case 'dangerous':
      return { bg: 'bg-danger-100', text: 'text-danger-500', border: 'border-danger-500' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-500' };
  }
}

/**
 * Get color tokens based on severity
 */
export function getSeverityColor(severity) {
  switch (severity) {
    case 'critical':
      return { bg: 'bg-danger-100', text: 'text-danger-500', border: 'border-danger-500' };
    case 'warning':
      return { bg: 'bg-warning-100', text: 'text-warning-500', border: 'border-warning-500' };
    case 'info':
      return { bg: 'bg-action-100', text: 'text-action-500', border: 'border-action-500' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-500' };
  }
}

/**
 * Get hex color for score representation
 */
export function getScoreColor(score) {
  if (score <= 30) return '#34C759'; // Safe
  if (score <= 60) return '#FF9F0A'; // Warning
  return '#FF3B30'; // Danger
}
