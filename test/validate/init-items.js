import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// No form
test('noform', (t) => {
  const div = document.createElement('form');

  const bubo = new Validate(div);

  t.is(bubo.items.length, 0);
});

// Nothing to validate
test('none', (t) => {
  t.context.form.appendChild(createElement('input'));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 0);
});

// Required attribute
test('required', (t) => {
  t.context.form.appendChild(createElement('input', {required: ''}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

// Rule type
test('rule:type', (t) => {
  t.context.form.appendChild(createElement('input', {type: 'email'}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

// Rule attribute
test('rule:attribute', (t) => {
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});

// Required + rules (type/attribute)
test('required+rules', (t) => {
  t.context.form.appendChild(createElement('input', {
    required: '',
    type: 'email',
    minLength: '5',
  }));

  const bubo = new Validate(t.context.form);

  t.is(bubo.items.length, 1);
});


// Multiple items
test('multiple', (t) => {
  t.context.form.appendChild(createElement('input'));
  t.context.form.appendChild(createElement('input', {required: ''}));
  t.context.form.appendChild(createElement('input', {type: 'email'}));
  t.context.form.appendChild(createElement('input', {minLength: '5'}));

  const bubo = new Validate(t.context.form);

  // eslint-disable-next-line no-magic-numbers
  t.is(bubo.items.length, 3);
});

// Group (same name attribute)
test('group', (t) => {
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
