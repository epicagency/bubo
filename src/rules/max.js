import isAfter from 'date-fns/is_after';
import { hasRule } from '../helpers/utils';

/**
 * Check if valid min
 *
 * @export
 * @param {string} value value
 * @param {Object} rule form rule
 * @param {Object} item Bubo item
 * @returns {boolean} true if greater than max value
 */
export default function isMax(value, rule, item) {
  if (!hasRule(item, 'minmax')) {
    if (item.type === 'number') {
      return parseFloat(value) > rule.value;
    }

    if (item.type === 'date') {
      const date = new Date(value);

      return isAfter(date, rule.value);
    }
    // !TODO add time cheks
  }

  return false;
}
