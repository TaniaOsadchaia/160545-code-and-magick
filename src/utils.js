'use strict';

var utils = {
  inherit: function(ClChild, ClParent) {
    ClChild.prototype = new ClParent();
  },

  setVisible: function(htmlElement, value) {
    if (value) {
      htmlElement.classList.remove('invisible');
    } else {
      htmlElement.classList.add('invisible');
    }
  },

  setDisabled: function(htmlElement, value) {
    if (value) {
      htmlElement.setAttribute('disabled', true);
    } else {
      htmlElement.removeAttribute('disabled');
    }
  },

  setChecked: function(htmlElement, value) {
    htmlElement.control.checked = value;
  },

  isInputEmpty: function(input) {
    return input.value.trim() !== '';
  }
};

module.exports = utils;
