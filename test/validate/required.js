import test from 'ava';
import Validate from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Text is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Checkbox is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'checkbox',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Radio button is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'radio',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Select is required', (t) => {
  const item = createElement('select', {
    name: 'test',
    required: '',
  });
  const opt = item.querySelector('option:last-of-type');

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  opt.setAttribute('selected', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
