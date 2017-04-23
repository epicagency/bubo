import * as locales from '../locales';
import { parseTpl } from '../helpers/utils';

/**
 * Handle messages
 *
 * @class Messenger
 */
class Messenger {
  /**
   * Creates an instance of Messenger.
   * @param {string} [locale='en'] default locale is english
   *
   * @memberOf Messenger
   */
  constructor(locale = 'en') {
    this.locale = locale;
    this._messages = this.getMessages();
  }

  /**
   * Get locale value
   * @readonly
   *
   * @memberOf Messenger
   */
  get locale() {
    return this._locale;
  }

  /**
   * Set new locale value
   * @param {string} locale available locale
   *
   * @memberOf Messenger
   */
  set locale(locale) {
    if (Messenger._hasLocale(locale)) {
      this._locale = locale;
      this._messages = this.getMessages();
    }
  }

  /**
   * Check if locale exists
   *
   * @static
   * @param {string} locale locale to check
   * @returns {boolean} returns true if locale exists
   *
   * @memberOf Messenger
   */
  static _hasLocale(locale) {
    if (!locales[locale]) {
      throw new Error(`🦉 locale "${locale}" is not available!`);
    }

    return true;
  }

  // !TODO addLocale()

  /**
   * Get messages
   *
   * @returns {Object} messages
   *
   * @memberOf Messenger
   */
  getMessages() {
    return locales[this.locale];
  }

  /**
   * Get global text message depending on status
   *
   * @param {string} status status
   * @returns {string} text message
   */
  getText(status) {
    return this._messages.status[status];
  }

  /**
   * Get error message
   *
   * @param {string} rule rule name
   * @param {string} [label=null] dynamic label
   * @param {any} [value=null] dynamic value(s)
   * @returns {string} error message
   */
  getError(rule, label = null, ...values) {
    const errorMessages = this._messages.errors;
    const strings = {
      label: label || errorMessages.defaultLabel,
    };

    values.forEach((val, i) => {
      strings[`value${i}`] = val;
    });

    return parseTpl(errorMessages.rules[rule], strings);
  }
}

export default Messenger;
