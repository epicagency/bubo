import test from 'ava';
import Validate from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Email is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'email',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa@aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa@aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('URL is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'url',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'http://aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'https://aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Number is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'a';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '-1';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '0';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '1.11';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
