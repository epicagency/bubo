import { url } from 'is_js';

/**
 * Check if invalid URL
 *
 * @export
 * @param {string} value URL value
 * @returns {boolean} true if invalid url
 */
export default function isNotUrl(value) {
  return !url(value);
}
