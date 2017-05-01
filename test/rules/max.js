import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Max with wrong type', (t) => {
  const item = createElement('input', {
    name: 'test',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '4';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Max is valid (number)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '4';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '3';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Max is valid (date)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'date',
    max: '2015-10-21',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '2015-10-22';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2015-10-21';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
