import { number } from 'is_js';

/**
 * Check if invalid number
 *
 * @export
 * @param {string} value number value
 * @returns {boolean} true if invalid number
 */
export default function isNotNumber(value) {
  return !number(parseFloat(value));
}
