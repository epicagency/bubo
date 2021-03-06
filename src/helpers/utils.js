/**
 * Check if an element is required
 *
 * @param {Object} el DOM element
 * @returns {boolean} true/false
 */
function isRequired(el) {
  return el.hasAttribute('required');
}

/**
 * Check if an element has "rules" parameters
 *
 * @param {Object} el DOM element
 * @returns {Array|false} valid informations
 */
function hasRules(el) {
  const elType = el.getAttribute('type');
  const rules = [];

  // Based on type attribute
  const types = [
    // 'color',
    'date',
    // 'datetime-local',
    'email',
    'number',
    'tel',
    // 'time',
    'url',
  ];

  types.forEach((type) => {
    if (type === elType) {
      rules.push(addRule(type));
    }
  });

  // Based on other attributes
  const attributes = [
    'min',
    'minlength',
    'max',
    'maxlength',
    'pattern',
    // 'step',
  ];

  attributes.forEach((attr) => {
    if (el.hasAttribute(attr)) {
      let val = el.getAttribute(attr);

      if (attr.includes('min') || attr.includes('max')) {
        if (elType === 'number') {
          val = parseFloat(val);
        }
        if (elType === 'date') {
          val = new Date(val);
        }
      }

      if (attr.includes('pattern')) {
        try {
          new RegExp(val); // eslint-disable-line no-new
        } catch (e) {
          throw new Error(`🦉 ${val} seems to be an invalid pattern!`);
        }
      }

      rules.push(addRule(attr, val));
    }
  });

  // If min/max -> special rule
  if (el.hasAttribute('min') && el.hasAttribute('max')) {
    rules.push(addRule('minmax'));
  }

  // If min/maxLength -> special rule
  if (el.hasAttribute('minlength') && el.hasAttribute('maxlength')) {
    rules.push(addRule('minmaxlength'));
  }

  if (rules.length > 0) {
    return rules;
  }

  return false;
}

/**
* Create a new "rule" object
*
* @param {string} name name of the rule
* @param {any} [value=null] value for validation
* @returns {Object} rule
*/
function addRule(name, value = null) {
  const rule = { name };

  if (value) {
    rule.value = value;
  }

  return rule;
}

/**
 * Check if item has rule
 *
 * @export
 * @param {Object} item Budo item
 * @param {string} name rule name
 * @returns {boolean} true/false
 */
export function hasRule(item, name) {
  const matches = item.rules.filter((rule) => rule.name === name);

  return matches.length === 1;
}

/**
 * Get item rule by rule name
 *
 * @export
 * @param {Object} item Budo item
 * @param {string} name rule name
 * @returns {Object} rule
 */
export function getRuleByName(item, name) {
  return item.rules.filter((rule) => rule.name === name)[0];
}

/**
 * Check if an element should be validated
 *
 * @export
 * @param {Object} el DOM element
 * @returns {Object} item
 */
export function shouldValidate(el) {
  const item = {};

  // Check / get required parameter
  const required = isRequired(el);

  if (required) {
    item.required = required;
  }

  // Check / get valid parameters (aka rules)
  const rules = hasRules(el);

  if (rules) {
    item.rules = rules;
  }

  // If something to validate
  // set others parameters
  // and return Bubo item
  if (item.required || item.rules) {
    item.el = el;
    item.name = el.dataset.formName || el.getAttribute('name');
    item.label = el.dataset.formLabel || null;
    item.type = el.hasAttribute('type') ?
      el.getAttribute('type') :
      el.nodeName.toLowerCase();

    return item;
  }

  return false;
}


/**
 * Source: https://gist.github.com/smeijer/6580740a0ff468960a5257108af1384e
 */

/**
 * Replace template expression
 *
 * @param {string} exp expression to replace
 * @param {Object} obj key/value for replacement
 * @param {string} [fb=`$\{${path}}`] fallback
 * @returns {string} replaced expression
 */
function get(exp, obj, fb = `$\{${exp}}`) {
  return exp.split('.').reduce((res, key) => res[key] || fb, obj);
}

/**
 * ES6 template string parser
 *
 * @export
 * @param {string} template template string
 * @param {Object} map key/value for replacement
 * @param {any} fallback fallback
 * @returns {string} parsed template
 */
export function parseTpl(template, map, fallback) {
  return template.replace(/\$\{.+?}/g, (match) => {
    // Extract ${<expression(s)>} from template
    // eslint-disable-next-line no-magic-numbers
    const exp = match.substr(2, match.length - 3).trim();

    return get(exp, map, fallback);
  });
}
