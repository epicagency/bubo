import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Number is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

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
