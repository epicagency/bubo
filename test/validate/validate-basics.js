import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// No validation
test('validate:novalidation', (t) => {
  const item = createElement('input', {
    name: 'test',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  t.is(bubo.errors, null);
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

// Rule validation (type)
test('type', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'email',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa@aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});


// Rule validation (attribute)
test('attribute', (t) => {
  const item = createElement('input', {
    name: 'test',
    minlength: '5',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aaaaa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});


// Multiple validation
test('validate:multiple', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'email',
    minlength: '5',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aa';
  bubo.validate();
  // eslint-disable-next-line no-magic-numbers
  t.is(bubo.errors.test.length, 2);
});
