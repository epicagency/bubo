import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// Rule min
test('min', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    min: '2',
  });

  wrong.value = '1';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

// Rule max
test('max', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = '4';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '3';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    max: '3',
  });

  wrong.value = '4';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

// Rule minmax
test('minmax', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '4';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '3';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '2.5';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    min: '2',
    max: '3',
  });

  wrong.value = '1';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

// Rule minlength
test('minlength', (t) => {
  const item = createElement('input', {
    name: 'test',
    minlength: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'a';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    minlength: '2',
  });

  wrong.value = '1';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

// Rule maxlength
test('maxlength', (t) => {
  const item = createElement('input', {
    name: 'test',
    maxlength: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aaaa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aaa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    maxlength: '3',
  });

  wrong.value = '1111';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

// Rule minmaxlength
test('minmaxlength', (t) => {
  const item = createElement('input', {
    name: 'test',
    minlength: '2',
    maxlength: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'a';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aaaa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'aaa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    minlength: '2',
    maxlength: '3',
  });

  wrong.value = '1';
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});
