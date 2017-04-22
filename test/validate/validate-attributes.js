import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// Rule min
test('validate:attribute:min', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '5',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 2;
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 5;
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

// Rule max
test('validate:attribute:max', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    max: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 5;
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 2;
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

// Rule minmax
test('validate:attribute:minmax', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
    max: '5',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 1;
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 6;
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 2;
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 5;
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

// Rule minlength
test('validate:attribute:minlength', (t) => {
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

// Rule maxlength
test('validate:attribute:maxlength', (t) => {
  const item = createElement('input', {
    name: 'test',
    maxlength: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aaaaa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

// Rule minmaxlength
test('validate:attribute:minmaxlength', (t) => {
  const item = createElement('input', {
    name: 'test',
    minlength: '2',
    maxlength: '5',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'a';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aaaaaa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'aaaaa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
