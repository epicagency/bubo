/* eslint-disable no-template-curly-in-string, max-len */
const en = {
  status: {
    success: 'The form is completed correctly.',
    error: 'Please correct errors.',
  },
  errors: {
    defaultLabel: 'This field',
    rules: {
      required: '${label} is required.',
      email: '${label} must be a valid email.',
      url: '${label} must be a valid URL.',
      number: '${label} must be a number.',
      date: '${label} must be a valid date.',
      min: '${label} must be greater than or equal to ${value0}.',
      max: '${label} must be less than or equal to ${value0}.',
      minmax: '${label} must be between or equal to ${value0} and ${value1}.',
      minlength: '${label} must have, at least, ${value0} characters.',
      maxlength: '${label} must have, at most, ${value0} characters.',
      minmaxlength: '${label} must have between ${value0} and ${value1} characters.',
      pattern: '${label} must match the requested format (${value0}).',
    },
  },
};
/* eslint-enable no-template-curly-in-string, max-len */

export default en;
