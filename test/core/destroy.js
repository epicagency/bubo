import test from 'ava';
import Bubo from '../../src/index.js';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Bubo properly destroyed', (t) => {
  const bubo = new Bubo(t.context.form);

  bubo.destroy();
  t.is(bubo.items, undefined);
  t.is(bubo.results, undefined);
});
