import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Min with wrong type', (t) => {
  const item = createElement('input', {
    name: 'test',
    min: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Min is valid (number)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Min is valid (date)', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'date',
    min: '2015-10-21',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '2015-10-20';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2015-10-21';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
