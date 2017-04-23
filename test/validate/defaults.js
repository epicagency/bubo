import test from 'ava';
import Validate from '../../src';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Form is a HTMLFormElement', (t) => {
  const bubo = new Validate(t.context.form);

  t.truthy(bubo._form instanceof window.HTMLFormElement);

  const div = document.createElement('div');
  const error = t.throws(() => {
    new Validate(div); // eslint-disable-line
  }, Error);

  t.is(error.message, '🦉 form parameter should be a HTMLFormElement!');
});

test('Form has novalidate attribute', (t) => {
  new Validate(t.context.form); // eslint-disable-line
  t.is(t.context.form.hasAttribute('novalidate'), true);
});

test('Validate has default locale', (t) => {
  const bubo = new Validate(t.context.form);

  t.is(bubo.locale, 'en');
});

test('Validate can change locale', (t) => {
  const bubo = new Validate(t.context.form);

  bubo.locale = 'fr';
  t.is(bubo.locale, 'fr');
});

test('Nothing to validate', (t) => {
  t.context.form.appendChild(createElement('input'));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 0);
});

test('An element is required', (t) => {
  t.context.form.appendChild(createElement('input', {required: ''}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element has a type to validate', (t) => {
  t.context.form.appendChild(createElement('input', {type: 'email'}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element has an attribute to validate', (t) => {
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

test('An element is required with validations', (t) => {
  t.context.form.appendChild(createElement('input', {
    required: '',
    type: 'email',
    minLength: '5',
  }));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

test('Many elements required / to be validated', (t) => {
  t.context.form.appendChild(createElement('input'));
  t.context.form.appendChild(createElement('input', {required: ''}));
  t.context.form.appendChild(createElement('input', {type: 'email'}));
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Validate(t.context.form);

  // eslint-disable-next-line no-magic-numbers
  t.is(bubo.items.length, 3);
});

test('There is a group required (same name)', (t) => {
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    required: '',
  }));
  t.context.form.appendChild(createElement('input', {
    name: 'same',
    required: '',
  }));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});
