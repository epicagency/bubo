import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import {
  getRuleByName,
} from '../helpers/utils';

/**
 * Check if valid min
 *
 * @export
 * @param {string} value value
 * @param {Object} rule form rule
 * @param {Object} item Bubo item
 * @returns {boolean} true if between or equal to min and max values
 */
export default function isMinMax(value, rule, item) {
  const min = getRuleByName(item, 'min').value;
  const max = getRuleByName(item, 'max').value;

  if (item.type === 'number') {
    const number = parseFloat(value);

    return number < min || number > max;
  }

  if (item.type === 'date') {
    const date = new Date(value);

    return isBefore(date, min) || isAfter(date, max);
  }
  // !TODO add time cheks

  return false;
}
