import { parseTpl } from './utils';

/* eslint-disable no-template-curly-in-string, max-len */
const msg = {
  en: {
    defaultLabel: 'This field',
    success: 'The form is completed correctly.',
    error: 'Please correct errors.',
    required: '${label} is required.',
    email: '${label} is not a valid email.',
    url: '${label} is not a valid URL.',
    number: '${label} should be a number.',
    min: '${label} should be greater or equal to ${value0}.',
    max: '${label} should be less or equal to ${value0}.',
    minmax: '${label} should be between or equal to ${value0} and ${value1}.',
    minlength: '${label} should be greater or equal to ${value0}.',
    maxlength: '${label} should be less or equal to ${value0}.',
    minmaxlength: '${label} should be between or equal to ${value0} and ${value1}.',
  },
};
/* eslint-enable no-template-curly-in-string, max-len */

/**
 * Get global text message depending on status
 *
 * @export
 * @param {string} status status
 * @param {string} [loc=en] locale
 * @returns {string} text message
 */
export function getText(status, loc = 'en') {
  return msg[loc][status];
}

/**
 * Get error message
 *
 * @export
 * @param {string} key message property
 * @param {string} [label=null] dynamic text
 * @param {string} [loc=en] locale
 * @param {any} [value=null] dynamic value
 * @returns {string} error message
 */
export function getError(key, label = null, loc = 'en', ...values) {
  // !DEV add check available locale
  const strings = {
    label: label || msg[loc].defaultLabel,
  };

  values.forEach((val, i) => {
    strings[`value${i}`] = val;
  });

  return parseTpl(msg[loc][key], strings);
}
