import test from 'ava';
import { Validate } from '../../src/index.js';
import { createElement } from '../helpers/create-element';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// Submit
// jsdom do not support submit event
// neither click on button element (input[type="submit"] only)
test('submit', (t) => {
  const item = createElement('input', {
    name: 'test',
    required: '',
  });
  const submit = createElement('input', {
    type: 'submit',
  });

  t.context.form.appendChild(item);
  t.context.form.appendChild(submit);

  const bubo = new Validate(t.context.form);

  submit.click();
  t.is(bubo.errors.test.length, 1);
});
