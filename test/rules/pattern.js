import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Pattern with wrong type', (t) => {
  const pattern = '^a[0-9]{2}b$';
  const item = createElement('input', {
    name: 'test',
    type: 'hidden',
    pattern,
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = 'a12b';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Pattern value is a valid pattern', (t) => {
  const pattern = '^a[0-9{2}b$';
  const item = createElement('input', {
    name: 'test',
    pattern,
  });

  t.context.form.appendChild(item);

  const error = t.throws(() => {
    new Bubo(t.context.form); // eslint-disable-line
  }, Error);

  t.is(error.message, `🦉 ${pattern} seems to be an invalid pattern!`);
});


test('Pattern is valid', (t) => {
  const pattern = '^a[0-9]{2}b$';
  const els = [
    {
      type: 'text',
    },
    {
      type: 'search',
    },
    {
      type: 'password',
    },
    {
      type: 'tel',
    },
  ];
  const items = [];

  els.forEach((el) => {
    const item = createElement('input', {
      type: el.type,
      value: 'a11b',
      pattern,
    });

    items.push(item);
    t.context.form.appendChild(item);
  });

  const bubo = new Bubo(t.context.form);

  items.forEach((item) => {
    bubo.validate();
    t.is(bubo.errors[item.getAttribute('name')], undefined);

    item.value = 'a111b';
    bubo.validate();
    t.truthy(bubo.errors[item.getAttribute('name')].length >= 1);
  });
});

test('Pattern email is valid', (t) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = '^[a-z]{2}@[a-z]{2}\.[a-z]{2}$';
  const item = createElement('input', {
    name: 'test',
    type: 'email',
    pattern,
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = 'aa@aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = '11@aa.aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);
});

test('Pattern url is valid', (t) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = '^https://[a-z]{2}\.[a-z]{2}$';
  const item = createElement('input', {
    name: 'test',
    type: 'url',
    pattern,
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  item.value = 'https://aa.aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'http://aa.aa';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);
});
