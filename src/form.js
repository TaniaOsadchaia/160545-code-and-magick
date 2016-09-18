'use strict';

var utils = require('./utils');
var Component = require('./component');

var GRACE_HOPPER_BIRTHDAY = new Date(1906, 11, 9);
var COOKIE_NAME = 'review-name';
var COOKIE_MARK = 'review-mark';

var ReviewForm = function() {
  Component.call(this, document.querySelector('.overlay-container'));

  this.onClose = null;

  this.browserCookies = require('browser-cookies');

  this.formElement = document.querySelector('.review-form');
  this.formCloseButton = document.querySelector('.review-form-close');
  this.formSubmitButton = document.querySelector('.review-submit');
  this.formNameInput = document.querySelector('.review-form-field-name');
  this.formNameReminder = document.querySelector('.review-fields-name');
  this.formTextInput = document.querySelector('.review-form-field-text');
  this.formTextReminder = document.querySelector('.review-fields-text');
  this.formStars = document.querySelectorAll('.review-mark-label');
  this.formRemindersContainer = document.querySelector('.review-fields');
};

utils.inherit(ReviewForm, Component);

ReviewForm.prototype.show = function() {
  this.loadCookies();
  this.checkValidation();
  Component.prototype.show.call(this);
};

ReviewForm.prototype.hide = function() {
  Component.prototype.hide.call(this);
  if (typeof this.onClose === 'function') {
    this.onClose();
  }
};

ReviewForm.prototype.checkValidation = function() {
  // calc
  var isValidName = utils.isInputEmpty(this.formNameInput);
  var isValidText = (this.getNumStars() >= 3 || utils.isInputEmpty(this.formTextInput));
  var isValid = isValidName && isValidText;
  // visible
  utils.setVisible(this.formNameReminder, !isValidName);
  utils.setVisible(this.formTextReminder, !isValidText);
  utils.setVisible(this.formRemindersContainer, !isValid);
  utils.setDisabled(this.formSubmitButton, !isValid);
  return isValid;
};

ReviewForm.prototype.getNumStars = function() {
  return +document.querySelector('input[name="review-mark"]:checked').value;
};

ReviewForm.prototype.setNumStars = function(value) {
  value = +value;
  if (value >= 1 && value <= this.formStars.length) {
    utils.setChecked(this.formStars[this.formStars.length - value], true);
  }
};

ReviewForm.prototype.saveCookies = function() {
  var expires = this.calcCookiesExpires();
  var options = {expires: expires};
  this.browserCookies.set(COOKIE_NAME, this.formNameInput.value, options);
  this.browserCookies.set(COOKIE_MARK, String(this.getNumStars()), options);
};

ReviewForm.prototype.loadCookies = function() {
  var name = this.browserCookies.get(COOKIE_NAME);
  if (name && name !== 'null') {
    this.formNameInput.value = name;
  }
  var stars = this.browserCookies.get(COOKIE_MARK);
  if (stars && stars !== 'null') {
    this.setNumStars(stars);
  }
};

ReviewForm.prototype.calcCookiesExpires = function() {
  var timeDiff = 0;

  var now = new Date();
  var year = now.getFullYear();
  var time = now.getTime();

  var birthday = new Date(year, GRACE_HOPPER_BIRTHDAY.getMonth(), GRACE_HOPPER_BIRTHDAY.getDate());
  var birthdayTime = birthday.getTime();

  if (time < birthdayTime) {
    birthday.setFullYear(year - 1);
    birthdayTime = birthday.getTime();
  }

  timeDiff = (time - birthdayTime) / (24 * 60 * 60 * 1000);
  return timeDiff;
};

ReviewForm.prototype.onClick = function(evt) {
  Component.prototype.onClick.call(this, evt);
  switch (evt.target) {

    case this.formCloseButton:
      this.hide();
      break;

    case this.formSubmitButton:
      this.trySubmit();
      break;

    default:
      if (Array.prototype.includes.call(this.formStars, evt.target)) {
        this.setNumStars(evt.target.control.value);
        this.checkValidation();
        this.saveCookies();
      }
  }
};

ReviewForm.prototype.onInput = function(evt) {
  Component.prototype.onInput.call(this, evt);
  switch (evt.target) {

    case this.formTextInput:
      this.checkValidation();
      break;

    case this.formNameInput:
      this.checkValidation();
      this.saveCookies();
      break;
  }
};

ReviewForm.prototype.trySubmit = function() {
  var isValid = this.checkValidation();
  if (isValid) {
    this.saveCookies();
    this.element.submit();
  }
};

module.exports = ReviewForm;
