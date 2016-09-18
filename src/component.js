'use strict';

var utils = require('./utils');

var Component = function(elem) {
  this.element = elem;

  this.onClick = this.onClick.bind(this);
  this.onInput = this.onInput.bind(this);
};

Component.prototype.show = function() {
  utils.setVisible(this.element, true);
  this.addListeners();
};

Component.prototype.addListeners = function() {
  this.element.addEventListener('click', this.onClick);
  this.element.addEventListener('input', this.onInput);
};

Component.prototype.onClick = function(evt) {
  evt.preventDefault();
};

Component.prototype.onInput = function(evt) {
  evt.preventDefault();
};

Component.prototype.hide = function() {
  utils.setVisible(this.element, false);
  this.removeListeners();
};

Component.prototype.removeListeners = function() {
  this.element.removeEventListener('click', this.onClick);
  this.element.removeEventListener('input', this.onInput);
};

Component.prototype.destroy = function() {
  this.hide();
  this.element.parentNode.removeChild(this.element);
  this.element = null;
};

module.exports = Component;
