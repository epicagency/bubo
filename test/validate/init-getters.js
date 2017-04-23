import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('items', (t) => {
  const form = document.createElement('form');

  form.appendChild(createElement('input', { required: '' }));

  const bubo = new Validate(t.context.form);

  bubo.validate();

  t.not(bubo.results, null);
  t.not(bubo.errors, null);
  t.not(bubo.status, null);
  t.not(bubo.text, null);
  t.is(bubo.status, 'success');
  t.is(bubo.text, 'The form is completed correctly.');
  t.is(bubo.html, null);
});
