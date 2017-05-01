import test from 'ava';
import Bubo from '../../src';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Form has novalidate attribute', (t) => {
  new Bubo(t.context.form); // eslint-disable-line
  t.is(t.context.form.hasAttribute('novalidate'), true);
});

test('Nothing to validate', (t) => {
  t.context.form.appendChild(createElement('input'));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 0);
});

test('No errors on init', (t) => {
  const item = createElement('input', {
    name: 'test',
    required: '',
  });

  t.context.form.appendChild(item);

  const bubo = new Bubo(t.context.form);

  t.is(bubo.errors, null);
});

test('An element is required', (t) => {
  t.context.form.appendChild(createElement('input', {required: ''}));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element has a type to validate', (t) => {
  t.context.form.appendChild(createElement('input', {type: 'email'}));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element has an attribute to validate', (t) => {
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element is required with validations', (t) => {
  t.context.form.appendChild(createElement('input', {
    required: '',
    type: 'email',
    minLength: '5',
  }));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);
});

test('Many elements required / to be validated', (t) => {
  t.context.form.appendChild(createElement('input'));
  t.context.form.appendChild(createElement('input', {required: ''}));
  t.context.form.appendChild(createElement('input', {type: 'email'}));
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Bubo(t.context.form);

  // eslint-disable-next-line no-magic-numbers
  t.is(bubo.items.length, 3);
});

test('There is a group required', (t) => {
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    type: 'radio',
    required: '',
  }));
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    type: 'radio',
    required: '',
  }));

  const bubo = new Bubo(t.context.form);

  t.is(bubo.items.length, 1);
});

test('There are duplicate name attributes', (t) => {
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    required: '',
  }));
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    required: '',
  }));

  const error = t.throws(() => {
    new Bubo(t.context.form); // eslint-disable-line
  }, Error);

  t.is(error.message, '🦉 Duplicate “same” name attribute!');
});
