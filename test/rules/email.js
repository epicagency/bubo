import test from 'ava';
import Bubo from '../../src/index.js';
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

  const bubo = new Bubo(t.context.form);

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
