/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a placeholder
 * @return {string} UUID
 */
/* eslint-disable */
const uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
};
/* eslint-enable */

/**
 * Create a "jsdom" element
 *
 * @export
 * @param {string} tag element tag
 * @param {Object} [attributes={}] element attributes
 * @returns {HTMLElement} DOM element
 */
export function createElement(tag, attributes = {}) {
  const attrs = Object.assign({
    name: uuid(),
    type: 'text',
  }, attributes);
  const el = document.createElement(tag);

  // Waiting for HTMLElement.dataset support
  // https://github.com/tmpvar/jsdom/issues/961
  el.dataset = '';

  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key]);
    });
  }

  if (tag === 'select') {
    const opt1 = createElement('option', {value: ''});
    const opt2 = createElement('option', {value: '1'});

    el.appendChild(opt1);
    el.appendChild(opt2);
  }

  return el;
}
