import test from 'ava';
import Validate from '../../src';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Getters are fine', (t) => {
  const form = document.createElement('form');

  form.appendChild(createElement('input', { required: '' }));

  const bubo = new Validate(t.context.form);

  t.is(bubo.errors, null);
  t.is(bubo.status, null);
  t.is(bubo.text, null);
  t.is(bubo.html, null);

  bubo.validate();

  t.not(bubo.results, null);
  t.not(bubo.errors, null);
  t.not(bubo.status, null);
  t.not(bubo.text, null);
  t.not(bubo.status, null);
  t.not(bubo.text, null);
});

test.todo('Test html getter after validation');
