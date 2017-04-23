import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// Required validation
test('validate:required', (t) => {
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

// Required checkbox validation
test('checkbox', (t) => {
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

// Required radio validation
test('radio', (t) => {
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

// Required select validation
test('select', (t) => {
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
