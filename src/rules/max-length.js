import { hasRule } from '../helpers/utils';

/**
 * Check if valid min
 *
 * @export
 * @param {string} value value
 * @param {Object} rule form rule
 * @param {Object} item Bubo item
 * @returns {boolean} true if length greater than max value
 */
export default function isMaxlength(value, rule, item) {
  if ((
    item.type === 'text' ||
    item.type === 'email' ||
    item.type === 'search' ||
    item.type === 'password' ||
    item.type === 'tel' ||
    item.type === 'url'
  ) && !hasRule(item, 'minmaxlength')) {
    return value.length > rule.value;
  }

  return false;
}
