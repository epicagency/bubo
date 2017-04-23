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
 * @returns {boolean} true if length between or equal to min and max values
 */
export default function isMinmaxlength(value, rule, item) {
  if (
    item.type === 'text' ||
    item.type === 'email' ||
    item.type === 'search' ||
    item.type === 'password' ||
    item.type === 'tel' ||
    item.type === 'url'
  ) {
    const minlength = getRuleByName(item, 'minlength').value;
    const maxlength = getRuleByName(item, 'maxlength').value;

    return value.length < minlength || value.length > maxlength;
  }

  return false;
}
