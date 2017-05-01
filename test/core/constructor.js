import test from 'ava';
import Bubo from '../../src';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Form is a HTMLFormElement', (t) => {
  const bubo = new Bubo(t.context.form);

  t.truthy(bubo._form instanceof window.HTMLFormElement);

  const div = document.createElement('div');
  const error = t.throws(() => {
    new Bubo(div); // eslint-disable-line
  }, Error);

  t.is(error.message, '🦉 form parameter should be a HTMLFormElement!');
});
