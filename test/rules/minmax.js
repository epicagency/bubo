import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Min + max with wrong type', (t) => {
  const item = createElement('input', {
    name: 'test',
    min: '2',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Min + max is valid (number)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

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
});

test('Min + max is valid (date)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'date',
    min: '2015-10-21',
    max: '2015-10-23',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '2015-10-20';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2015-10-24';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2015-10-21';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '2015-10-23';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '2015-10-22';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
