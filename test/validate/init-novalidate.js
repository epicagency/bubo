import test from 'ava';
import { Validate } from '../../src/index.js';

test('init:novalidate', (t) => {
  const form = document.createElement('form');

  new Validate(form); // eslint-disable-line

  t.is(form.hasAttribute('novalidate'), true);
});
