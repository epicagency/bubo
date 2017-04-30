/**
 * Check if valid pattern
 *
 * @export
 * @param {string} value value
 * @param {Object} rule form rule
 * @param {Object} item Bubo item
 * @returns {boolean} true if do not match
 */
export default function doNotMatch(value, rule, item) {
  if (
    item.type === 'text' ||
    item.type === 'email' ||
    item.type === 'url' ||
    item.type === 'search' ||
    item.type === 'tel' ||
    item.type === 'password'
  ) {
    const regex = new RegExp(rule.value);

    return !regex.test(value);
  }

  return false;
}
