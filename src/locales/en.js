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
      email: '${label} is not a valid email.',
      url: '${label} is not a valid URL.',
      number: '${label} should be a number.',
      min: '${label} should be greater or equal to ${value0}.',
      max: '${label} should be less or equal to ${value0}.',
      minmax: '${label} should be between or equal to ${value0} and ${value1}.',
      minlength: '${label} should have, at least, ${value0} characters.',
      maxlength: '${label} should have, at most, ${value0} characters.',
      minmaxlength: '${label} should have between ${value0} and ${value1} characters.',
      pattern: '${label} should match this regular expression ${value0}.',
    },
  },
};
/* eslint-enable no-template-curly-in-string, max-len */

export default en;
