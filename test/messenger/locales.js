import test from 'ava';
import Messenger from '../../src/classes/Messenger';

test('Use "en" as default locale', (t) => {
  const msg = new Messenger();

  t.is(msg.locale, 'en');
});

test('Use only available locale', (t) => {
  const msg = new Messenger('fr');

  t.is(msg.locale, 'fr');

  const error = t.throws(() => {
    new Messenger('xx'); // eslint-disable-line
  }, Error);

  t.is(error.message, '🦉 locale "xx" is not available!');
});

test('Change locale', (t) => {
  const msg = new Messenger();

  msg.locale = 'fr';

  t.is(msg.locale, 'fr');
});

