import { hasRule } from '../helpers/utils';

/**
 * Check if valid min
 *
 * @export
 * @param {string} value value
 * @param {Object} rule form rule
 * @param {Object} item Bubo item
 * @returns {boolean} true if less than min value
 */
export default function isMin(value, rule, item) {
  // !TODO add date-time cheks
  // if (
  //   item.type === 'number' ||
  //   item.type === 'date' ||
  //   item.type === 'time'
  // ) {
  if (item.type === 'number' && !hasRule(item, 'minmax')) {
    return parseFloat(value) < rule.value;
  }

  return false;
}
