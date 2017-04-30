import test from 'ava';
import Validate from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Min is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = '1';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '2';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    min: '2',
  });

  wrong.value = '1';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

test('Max is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = '4';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = '3';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    max: '3',
  });

  wrong.value = '4';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

test('Min + max is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'number',
    min: '2',
    max: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

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

  t.context.form.removeChild(item);

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    min: '2',
    max: '3',
  });

  wrong.value = '1';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
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

  const bubo = new Validate(t.context.form);

  items.forEach((item) => {
    bubo.validate();
    t.is(bubo.errors[item.getAttribute('name')], undefined);

    item.value = 'a';
    bubo.validate();
    t.truthy(bubo.errors[item.getAttribute('name')].length >= 1);
  });

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    minlength: '2',
  });

  wrong.value = '1';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

test('Maxlength is valid', (t) => {
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
      maxlength: '12',
    });

    items.push(item);
    t.context.form.appendChild(item);
  });

  const bubo = new Validate(t.context.form);

  items.forEach((item) => {
    bubo.validate();
    t.is(bubo.errors[item.getAttribute('name')], undefined);

    item.value = 'aaaaaaaaaaaaaaa';
    bubo.validate();
    t.truthy(bubo.errors[item.getAttribute('name')].length >= 1);
  });

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    maxlength: '3',
  });

  wrong.value = '1111';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

test('Minlength + maxlength is valid', (t) => {
  const item = createElement('input', {
    name: 'test',
    minlength: '2',
    maxlength: '3',
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

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

  // Wrong type
  const wrong = createElement('input', {
    name: 'wrong',
    type: 'number',
    minlength: '2',
    maxlength: '3',
  });

  wrong.value = '1';
  t.context.form.appendChild(wrong);
  bubo.refresh();
  bubo.validate();
  t.is(bubo.errors.wrong, undefined);
});

test('Pattern value is a valid pattern', (t) => {
  const pattern = '^a[0-9{2}b$';
  const item = createElement('input', {
    name: 'test',
    pattern,
  });

  t.context.form.appendChild(item);

  const error = t.throws(() => {
    new Validate(t.context.form); // eslint-disable-line
  }, Error);

  t.is(error.message, `🦉 ${pattern} seems to be an invalid pattern!`);
});

test('Pattern is valid', (t) => {
  const pattern = '^a[0-9]{2}b$';
  const item = createElement('input', {
    name: 'test',
    pattern,
  });

  t.context.form.appendChild(item);

  const bubo = new Validate(t.context.form);

  item.value = 'a11b';
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item.value = 'a111b';
  bubo.validate();
  t.is(bubo.errors.test.length, 1);
});
