import { email } from 'is_js';

/**
 * Check if invalid email
 *
 * @export
 * @param {string} value email value
 * @returns {boolean} true if invalid email
 */
export default function isNotEmail(value) {
  return !email(value);
}
