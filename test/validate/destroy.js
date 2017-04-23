import test from 'ava';
import { Validate } from '../../src/index.js';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

// Destroy
test('destroy', (t) => {
  const bubo = new Validate(t.context.form);

  bubo.destroy();
  t.is(bubo.items, undefined);
  t.is(bubo.results, undefined);
});
