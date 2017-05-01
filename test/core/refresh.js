import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Bubo properly refreshed', (t) => {
  t.context.form.appendChild(createElement('input', { required: '' }));
  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);

  t.context.form.appendChild(createElement('input', { required: '' }));
  t.is(bubo.items.length, 1);

  bubo.refresh();
  t.is(bubo.items.length, 2); // eslint-disable-line
});
