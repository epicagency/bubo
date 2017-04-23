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
  // !TODO add date-time cheks
  // if (
  //   item.type === 'number' ||
  //   item.type === 'date' ||
  //   item.type === 'time'
  // ) {
  if (item.type === 'number') {
    const min = parseFloat(getRuleByName(item, 'min').value);
    const max = parseFloat(getRuleByName(item, 'max').value);
    const number = parseFloat(value);

    return number < min || number > max;
  }

  return false;
}
