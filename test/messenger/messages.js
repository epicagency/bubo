import test from 'ava';
import Messenger from '../../src/classes/Messenger';

test('Success text', (t) => {
  const msg = new Messenger();

  t.snapshot(msg.getText('success'));
});

test('Error text', (t) => {
  const msg = new Messenger();

  t.snapshot(msg.getText('error'));
});

test('Default error messages', (t) => {
  const msg = new Messenger();

  t.regex(
    msg.getError('required'),
    /^This field.+required.*/
  );

  t.regex(
    msg.getError('required', 'Test'),
    /^Test.+required.*/
  );

  t.regex(
    msg.getError('min', 'Test', 2), // eslint-disable-line
    /^Test.+2.*/
  );

  t.regex(
    msg.getError('minmax', 'Test', 2, 3), // eslint-disable-line
    /^Test.+2 and 3.*/
  );
});

test('Message changes with locale', (t) => {
  const msg = new Messenger();

  msg.locale = 'fr';
  t.regex(
    msg.getError('required'),
    /^Ce champs.+requis.*/
  );
});
