goog.provide('tr.dom');

goog.scope(function () {
  var dom = tr.dom,
      doc = goog.global.document;

  /**
   * @param {!Element} element
   * @param {string} name
   */
  dom.addClass = function (element, name) {
    if (!dom.hasClass(element, name)) {
      element.className += (element.className === '' ? '' : ' ') + name;
    }
  };

  /**
   * @param {!Element} element
   * @param {string} name
   */
  dom.removeClass = function (element, name) {
    var classes = element.className.split(/\s+/),
        result = [];

    for (var i = 0, len = classes.length; i < len; i += 1) {
      if (classes[i] !== name) {
        result.push(classes[i]);
      }
    }
    element.className = result.join(' ');
  };

  /**
   * @param {!Element} element
   * @param {string} name
   * @return {boolean}
   */
  dom.hasClass = function (element, name) {
    var classes = element.className.split(/\s+/);

    for (var i = 0, len = classes.length; i < len; i += 1) {
      if (classes[i] === name) {
        return true;
      }
    }
    return false;
  };

  /**
   * @param {!Element} element
   * @param {string} name
   * @param {string} value
   */
  dom.setAttribute = function (element, name, value) {
    element.setAttribute(name, value);
  };

  /**
   * @param {string} name
   * @param {Object=} attributes
   * @return {!Element}
   */
  dom.createElement = function (name, attributes) {
    var element = doc.createElement(name);

    if (attributes) {
      for (var attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
          dom.setAttribute(element, attributeName, attributes[attributeName]);
        }
      }
    }
    return element;
  };
});
