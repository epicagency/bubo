import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Date is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'date',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2017-05-01';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
