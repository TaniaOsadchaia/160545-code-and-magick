'use strict';

var GRACE_HOPPER_BIRTHDAY = new Date(1906, 11, 9);
var COOKIE_NAME = 'review-name';
var COOKIE_MARK = 'review-mark';

var ReviewForm = function() {
  this.onClose = null;
  this.browserCookies = require('browser-cookies');

  this.formContainer = document.querySelector('.overlay-container');
  this.formElement = document.querySelector('.review-form');
  this.formCloseButton = document.querySelector('.review-form-close');
  this.formSubmitButton = document.querySelector('.review-submit');
  this.formNameInput = document.querySelector('.review-form-field-name');
  this.formNameReminder = document.querySelector('.review-fields-name');
  this.formTextInput = document.querySelector('.review-form-field-text');
  this.formTextReminder = document.querySelector('.review-fields-text');
  this.formStars = document.querySelectorAll('.review-mark-label');
  this.formRemindersContainer = document.querySelector('.review-fields');

  this.onClick = this.onClick.bind(this);
  this.onInput = this.onInput.bind(this);
};

ReviewForm.prototype.open = function(cb) {
  this.loadCookies();
  this.checkValidation();
  this.formContainer.classList.remove('invisible');
  this.addListeners();
  cb();
};

ReviewForm.prototype.close = function() {
  this.removeListeners();
  this.formContainer.classList.add('invisible');
  if (typeof this.onClose === 'function') {
    this.onClose();
  }
};

ReviewForm.prototype.checkValidation = function() {
  // calc
  var isValidName = this.isInputEmpty(this.formNameInput);
  var isValidText = (this.getNumStars() >= 3 || this.isInputEmpty(this.formTextInput));
  var isValid = isValidName && isValidText;
  // visible
  this.setVisible(this.formNameReminder, !isValidName);
  this.setVisible(this.formTextReminder, !isValidText);
  this.setVisible(this.formRemindersContainer, !isValid);
  this.setDisabled(this.formSubmitButton, !isValid);
  return isValid;
};

ReviewForm.prototype.isInputEmpty = function(input) {
  return input.value.trim() !== '';
};

ReviewForm.prototype.setVisible = function(htmlElement, value) {
  if (value) {
    htmlElement.classList.remove('invisible');
  } else {
    htmlElement.classList.add('invisible');
  }
};

ReviewForm.prototype.setDisabled = function(htmlElement, value) {
  if (value) {
    htmlElement.setAttribute('disabled', true);
  } else {
    htmlElement.removeAttribute('disabled');
  }
};

ReviewForm.prototype.setChecked = function(htmlElement, value) {
  htmlElement.control.checked = value;
};

ReviewForm.prototype.getNumStars = function() {
  return +document.querySelector('input[name="review-mark"]:checked').value;
};

ReviewForm.prototype.setNumStars = function(value) {
  value = +value;
  if (value >= 1 && value <= this.formStars.length) {
    this.setChecked(this.formStars[this.formStars.length - value], true);
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

ReviewForm.prototype.addListeners = function() {
  this.formContainer.addEventListener('click', this.onClick);
  this.formContainer.addEventListener('input', this.onInput);
};

ReviewForm.prototype.removeListeners = function() {
  this.formContainer.removeEventListener('click', this.onClick);
  this.formContainer.removeEventListener('input', this.onInput);
};

ReviewForm.prototype.onClick = function(evt) {
  evt.preventDefault();
  switch (evt.target) {

    case this.formCloseButton:
      this.close();
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
  evt.preventDefault();
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
    this.formElement.submit();
  }
};

module.exports = ReviewForm;


