import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Minlength with wrong type', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    minlength: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.item, undefined);
});

test('Minlength is valid', (t) => {
  const els = [
    {
      type: 'text',
      value: 'aaaaaaaaaaaa',
    },
    {
      type: 'email',
      value: 'aaaa@aaaa.aa',
    },
    {
      type: 'search',
      value: 'aaaaaaaaaaaa',
    },
    {
      type: 'password',
      value: 'aaaaaaaaaaaa',
    },
    {
      type: 'tel',
      value: 'aaaaaaaaaaaa',
    },
    {
      type: 'url',
      value: 'http://aa.aa',
    },
  ];
  const items = [];

  els.forEach((el) => {
    const item = createElement('input', {
      type: el.type,
      value: el.value,
      minlength: '12',
    });

    items.push(item);
    t.context.form.appendChild(item);
  });

  const textarea = createElement('textarea', {
    name: 'test',
    value: 'aaaaaaaaaaaa',
    minlength: '12',
  });

  items.push(textarea);
  t.context.form.appendChild(textarea);

  const bubo = new Bubo(t.context.form);

  items.forEach((item) => {
    bubo.validate();
    t.is(bubo.errors[item.getAttribute('name')], undefined);

    item.value = 'a';
    bubo.validate();
    t.truthy(bubo.errors[item.getAttribute('name')].length >= 1);
  });
});
