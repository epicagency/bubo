import {
  empty as isEmpty,
  email as isEmail,
  url as isUrl,
  number as isNumber,
} from 'is_js';

import {
  shouldValidate,
  hasRule,
  getRuleByName,
} from './utils';
import {
  getText,
  getError,
} from './errors';

export class Validate {
  constructor(form, locale = 'en') {
    // !DEV if nothing -> all the forms of the page ? bof…
    // !DEV check if form exists ?
    // console.info('🦉 Bubo:Validate ready!');
    this._form = form;
    this._locale = locale;
    this._items = [];
    this._results = {};
    this._init();
    this._bind();
  }

  /**
   * Getters / setters
   */
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
    // Disable browser native validation
    this._form.setAttribute('novalidate', '');

    // Get all form elements
    const els = this._form.elements;

    // !DEV
    // empty form ?
    if (els.length === 0) {
      return;
    }

    // Check which elements must be validated
    [...els].forEach((el) => {
      const item = shouldValidate(el);

      // There should be only one item by name for validation (e.g. radio group)
      if (item && this._isUnique('name', item.name)) {
        this._items.push(item);
      }
    });
  }

  _isUnique(prop, value) {
    return this._items.filter((item) => item[prop] === value).length === 0;
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
    this._results.text = getText(this._results.status, this._locale);
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

    if (Validate._hasErrors(this._results)) {
      this._results.status = 'error';
      this._results.text = getText(this._results.status, this._locale);
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
          getError('required', label, this._locale)
          // `${label} is required`
        );
      }

      return;
    }

    if (isEmpty(value)) {
      this._addError(
        item,
        getError('required', label, this._locale)
        // `${label} is required`
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

    // eslint-disable-next-line default-case
    switch (rule.name) {
      case 'email':
        if (!isEmail(value)) {
          this._addError(
            item,
            getError('email', label, this._locale)
          );
        }
        break;

      case 'url':
        if (!isUrl(value)) {
          this._addError(
            item,
            getError('url', label, this._locale)
          );
        }
        break;

      case 'number':
        if (!isNumber(parseFloat(value))) {
          this._addError(
            item,
            getError('number', label, this._locale)
          );
        }
        break;

      case 'min':
        // !TODO add date-time cheks
        // if (
        //   item.type === 'number' ||
        //   item.type === 'date' ||
        //   item.type === 'time'
        // ) {
        if (item.type === 'number' && !hasRule(item, 'minmax')) {
          const number = parseFloat(value);

          if (number < rule.value) {
            this._addError(
              item,
              getError('min', label, this._locale, rule.value)
            );
          }
        }
        break;

      case 'max':
        // !TODO add date-time cheks
        // if (
        //   item.type === 'number' ||
        //   item.type === 'date' ||
        //   item.type === 'time'
        // ) {
        if (item.type === 'number' && !hasRule(item, 'minmax')) {
          const number = parseFloat(value);

          if (number > rule.value) {
            this._addError(
              item,
              getError('max', label, this._locale, rule.value)
            );
          }
        }
        break;

      case 'minmax':
        // !TODO add date-time cheks
        // if (
        //   item.type === 'number' ||
        //   item.type === 'date' ||
        //   item.type === 'time'
        // ) {
        if (item.type === 'number') {
          const min = getRuleByName(item, 'min').value;
          const max = getRuleByName(item, 'max').value;
          const number = parseFloat(value);

          if (number < min || number > max) {
            this._addError(
              item,
              getError('minmax', label, this._locale, min, max)
            );
          }
        }
        break;

      case 'minlength':
        if ((
          item.type === 'text' ||
          item.type === 'email' ||
          item.type === 'search' ||
          item.type === 'password' ||
          item.type === 'tel' ||
          item.type === 'url'
        ) && !hasRule(item, 'minmaxlength')) {
          if (value.length < rule.value) {
            this._addError(
              item,
              getError('minlength', label, this._locale, rule.value)
            );
          }
        }
        break;

      case 'maxlength':
        if ((
          item.type === 'text' ||
          item.type === 'email' ||
          item.type === 'search' ||
          item.type === 'password' ||
          item.type === 'tel' ||
          item.type === 'url'
        ) && !hasRule(item, 'minmaxlength')) {
          if (value.length > rule.value) {
            this._addError(
              item,
              getError('maxlength', label, this._locale, rule.value)
            );
          }
        }
        break;

      case 'minmaxlength':
        if (
          item.type === 'text' ||
          item.type === 'email' ||
          item.type === 'search' ||
          item.type === 'password' ||
          item.type === 'tel' ||
          item.type === 'url'
        ) {
          const minlength = getRuleByName(item, 'minlength').value;
          const maxlength = getRuleByName(item, 'maxlength').value;

          if (value.length < minlength || value.length > maxlength) {
            this._addError(
              item,
              getError('minmaxlength', label, this._locale, rule.value)
            );
          }
        }
        break;

        // No default
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

  /**
   * Bind events
   *
   * Available events:
   *    submit
   *
   * @returns {undefined}
   *
   * @memberOf Validate
   */
  _bind() {
    this.onSubmit = this._submit.bind(this);
    this._form.addEventListener('submit', this.onSubmit);
  }

  /**
   * Bind events
   *
   * Available events:
   *    submit
   *
   * @returns {undefined}
   *
   * @memberOf Validate
   */
  _unbind() {
    this._form.removeEventListener('submit', this.onSubmit);
  }

  _submit(e) {
    e.preventDefault();
    this.validate();
    console.info(this.errors);
  }

  destroy() {
    this._unbind();
    delete this._items;
    delete this._results;
  }
}

export default Validate;
