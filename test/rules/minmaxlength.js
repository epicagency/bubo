import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Minlength + maxlength with wrong type', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    minlength: '2',
    maxlength: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.item, undefined);
});

test('Minlength + maxlength is valid', (t) => {
  // !DEV add different supported types…
  const item = createElement('input', {
    name: 'test',
    minlength: '2',
    maxlength: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

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
});
