import test from 'ava';
import Bubo from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Text is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Checkbox is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'checkbox',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Radio button is required', (t) => {
  const item = createElement('input', {
    name: 'test',
    type: 'radio',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});


test.skip('Radio button group is required', (t) => {
  // !DEV
  // with jsdom, `form.elements[name] returns the first radio input
  // rather than a RadioNodeList
  // https://github.com/tmpvar/jsdom/issues/1129
  // https://github.com/tmpvar/jsdom/issues/1688
  const item1 = createElement('input', {
    name: 'test',
    type: 'radio',
    value: 'foo',
    required: '',
  });
  const item2 = createElement('input', {
    name: 'test',
    type: 'radio',
    value: 'bar',
    required: '',
  });

  t.context.form.appendChild(item1);
  t.context.form.appendChild(item2);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item1.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);

  item1.removeAttribute('checked');
  item2.setAttribute('checked', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Select is required', (t) => {
  const item = createElement('select', {
    name: 'test',
    required: '',
  });
  const opt = item.querySelector('option:last-of-type');

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  opt.setAttribute('selected', '');
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});

test('Textearea is required', (t) => {
  const item = createElement('textarea', {
    name: 'test',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  bubo.validate();
  t.is(bubo.errors.test.length, 1);

  item.value = 'aa';
  bubo.validate();
  t.is(bubo.errors.test, undefined);
});
