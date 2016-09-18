'use strict';

var utils = {
  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  detectIE: function() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  },

  inherit: function(ClChild, ClParent) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = ClParent.prototype;
    ClChild.prototype = new EmptyConstructor();
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
    if (window.isIE) {
      htmlElement.previousSibling.checked = value;
    } else {
      htmlElement.control.checked = value;
    }
  },

  isInputEmpty: function(input) {
    return input.value.trim() !== '';
  },

  getControl: function(htmlElement) {
    return (window.isIE) ? htmlElement.previousSibling : htmlElement.control;
  },

  getWindowScrollY: function() {
    return window.isIE ? window.pageYOffset : window.scrollY;
  },

  hideTemplates: function() {
    var templates = document.querySelectorAll('template');
    for (var i = 0; i < templates.length; i++) {
      this.setVisible(templates[i], false);
    }
  },

  initJS: function() {
    if (!NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    window.isIE = Boolean(this.detectIE());
    if (window.isIE) {
      this.hideTemplates();
    }
  },

};

module.exports = utils;
