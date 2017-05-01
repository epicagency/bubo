import test from 'ava';
import Bubo from '../../src';

test.beforeEach((t) => {
  t.context.form = document.createElement('form');
});

test('Bubo has default locale', (t) => {
  const bubo = new Bubo(t.context.form);

  t.is(bubo.locale, 'en');
});

test('Bubo can change locale', (t) => {
  const bubo = new Bubo(t.context.form);

  bubo.locale = 'fr';
  t.is(bubo.locale, 'fr');
});

test.todo('Bubo can add locale');
