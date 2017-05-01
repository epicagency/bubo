import isValid from 'date-fns/is_valid';

/**
 * Check if invalid date
 *
 * @export
 * @param {string} value date value
 * @returns {boolean} true if invalid date
 */
export default function isNotDate(value) {
  return !isValid(new Date(value));
}
