import Messenger from './Messenger';

import * as rules from '../rules';

import {
  empty as isEmpty,
} from 'is_js';

import {
  shouldValidate,
  getRuleByName,
} from '../helpers/utils';

/**
 * Core class of Bubo
 *
 * @export
 * @class Core
 */
export class Core {
  constructor(form) {
    if (!(form instanceof window.HTMLFormElement)) {
      throw new Error('🦉 form parameter should be a HTMLFormElement!');
    }

    this._messenger = new Messenger();
    this._form = form;

    this._init();
  }

  /**
   * Getters / setters
   */
  get locale() {
    return this._messenger.locale;
  }

  set locale(locale) {
    this._messenger.locale = locale;
  }

  get items() {
    return this._items;
  }

  get results() {
    return this._results;
  }

  get errors() {
    return this._results.errors || null;
  }

  get status() {
    return this._results.status || null;
  }

  get text() {
    return this._results.text || null;
  }

  get html() {
    return this._results.html || null;
  }

  _init() {
    this._items = [];
    this._results = {};

    // Disable browser native validation
    this._form.setAttribute('novalidate', '');

    // Get all form elements
    const els = this._form.elements;

    // Empty form ?
    if (els.length === 0) {
      return;
    }

    // Check which elements must be validated
    [...els].forEach((el) => {
      const item = shouldValidate(el);

      if (!item) {
        return;
      }

      // There should be only one item by name for validation (e.g. radio group)
      if (this._isUnique('name', item.name)) {
        this._items.push(item);
      } else {
        if (item.type !== 'radio') {
          throw new Error(`🦉 Duplicate “${item.name}” name attribute!`);
        }
        // Set existing items to "group" type
        this._items.map((i) => {
          if (i.name === item.name) {
            i.type = 'group';
          }

          return i;
        });
      }
    });
  }

  _isUnique(prop, value) {
    return this._items.filter((item) => item[prop] === value).length === 0;
  }

  refresh() {
    this._init();
  }

  /**
   * Validate the form items
   *
   * @returns {undefined}
   *
   * @memberOf Validate
   */
  validate() {
    this._results.status = 'success';
    this._results.text = this._messenger.getText(this._results.status);
    this._results.errors = {};

    this._items.forEach((item) => {
      // Use form elements to get value from item's name
      // Better than from element's value/checked (e.g. radio group)
      const { value } = this._form.elements[item.name];

      if (item.required) {
        this._isCompleted(item, value);
      }

      if (item.rules && !isEmpty(value)) {
        item.rules.forEach((rule) => {
          this._isValid(item, rule, value);
        });
      }
    });

    if (Core._hasErrors(this._results)) {
      this._results.status = 'error';
      this._results.text = this._messenger.getText(this._results.status);
    }
  }

  /**
   * Check if a required form element is completed
   * if, add an error…
   *
   * @param {Object} item Bubo item
   * @param {string} value element value
   * @returns {boolean} true|false
   *
   * @memberOf Validate
   */
  _isCompleted(item, value) {
    const label = item.label || item.name;


    if (item.type === 'checkbox' || item.type === 'radio') {
      if (!item.el.checked) {
        this._addError(
          item,
          this._messenger.getError('required', label)
        );
      }

      return;
    }

    if (isEmpty(value)) {
      this._addError(
        item,
        this._messenger.getError('required', label)
      );
    }
  }

  /**
   * Check if a "ruled" form element is valid
   * if, add an error…
   *
   * Avalaible rules:
   *    email, url, number
   * Todo:
   *    date, time, tel, color, datetime-local, pattern, min, max,
   *    minmax, minlength, maxlength, minmaxlength, step
   *
   * @param {Object} item Bubo item
   * @param {Object} rule validation rule
   * @param {string} value element value
   * @returns {boolean} true|false
   *
   * @memberOf Validate
   */
  _isValid(item, rule, value) {
    const label = item.label || item.name;

    // Do rule validation
    if (rules[rule.name](value, rule, item)) {
      // Then, create error if invalid
      this._createError(item, rule, label);
    }
  }

  /**
   * Check if validation errors
   *
   * @static
   * @param {Object} results validation results
   * @returns {boolean} true|false
   *
   * @memberOf Validate
   */
  static _hasErrors(results) {
    return Object.keys(results.errors).length > 0;
  }

  _createError(item, rule, label) {
    const { name } = rule;
    let val1;
    let val2 = '';

    switch (name) {
      case 'min':
      case 'max':
      case 'minlength':
      case 'maxlength':
      case 'pattern':
        val1 = rule.value;
        break;

      case 'minmax':
        val1 = getRuleByName(item, 'min').value;
        val2 = getRuleByName(item, 'max').value;
        break;

      case 'minmaxlength':
        val1 = getRuleByName(item, 'minlength').value;
        val2 = getRuleByName(item, 'maxlength').value;
        break;

      default:
        val1 = '';
    }

    this._addError(
      item,
      this._messenger.getError(name, label, val1, val2)
    );
  }

  /**
   * Add a new error
   *
   * @param {any} item Bubo item
   * @param {any} text error message
   * @returns {undefined}
   * @memberOf Validate
   */
  _addError(item, text) {
    if (this._results.errors[item.name]) {
      // Add error
      this._results.errors[item.name].push(text);
    } else {
      // Create first error
      this._results.errors[item.name] = [text];
    }
  }

  destroy() {
    delete this._items;
    delete this._results;
  }
}

export default Core;
