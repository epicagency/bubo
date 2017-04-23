import test from 'ava';
import {
  getError,
  getText,
} from '../../src/errors.js';

// !DEV
// import { Validate } from '../../src/index.js';
// import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.loc = 'en';
});

// Default label
test('default', (t) => {
  const err = getError('required');

  t.is(err, 'This field is required.');
});

// Success text
test('success', (t) => {
  const text = getText('success');

  t.is(text, 'The form is completed correctly.');
});

// Error text
test('error', (t) => {
  const text = getText('error');

  t.is(text, 'Please correct errors.');
});
