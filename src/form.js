'use strict';

window.form = (function() {
  var COOKIE_NAME = 'review-name';
  var COOKIE_MARK = 'review-mark';

  var browserCookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var formElement = document.querySelector('.review-form');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var formNameInput = document.querySelector('.review-form-field-name');
  var formNameReminder = document.querySelector('.review-fields-name');
  var formTextInput = document.querySelector('.review-form-field-text');
  var formTextReminder = document.querySelector('.review-fields-text');
  var formStars = document.querySelectorAll('.review-mark-label');
  var formRemindersContainer = document.querySelector('.review-fields');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      this.loadCookies();
      this.checkValidation();
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    checkValidation: function(numStars) {
      if (typeof numStars === 'undefined') {
        numStars = this.getNumStars();
      }
      // calc
      var isValidName = this.isInputEmpty(formNameInput);
      var isValidText = (numStars >= 3 || this.isInputEmpty(formTextInput));
      var isValid = isValidName && isValidText;
      // visible
      this.setVisible(formNameReminder, !isValidName);
      this.setVisible(formTextReminder, !isValidText);
      this.setVisible(formRemindersContainer, !isValid);
      this.setDisabled(formSubmitButton, !isValid);
      return isValid;
    },

    isInputEmpty: function(input) {
      return input.value.trim() !== '';
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
      if (value) {
        htmlElement.setAttribute('checked', true);
      } else {
        htmlElement.removeAttribute('checked');
      }
    },

    getNumStars: function() {
      return document.querySelector('input[name="review-mark"]:checked').value;
    },

    setNumStars: function(value) {
      if (value >= 0 && value < formStars.length) {
        this.setChecked(formStars[value - 1], true);
      }
    },

    saveCookies: function() {
      var expires = this.calcCookiesExpires();
      var options = {expires: expires};
      browserCookies.set(COOKIE_NAME, formNameInput.value, options);
      browserCookies.set(COOKIE_MARK, this.getNumStars(), options);
    },

    loadCookies: function() {
      var name = browserCookies.get(COOKIE_NAME);
      if (name && name !== 'null') {
        formNameInput.value = name;
      }
      var stars = browserCookies.get(COOKIE_MARK);
      if (stars && stars != 'null') {
        this.setNumStars(stars);
      }
    },

    calcCookiesExpires: function() {
      var now = new Date();
      var year = now.getFullYear();
      var time = now.getTime();

      var birthday = new Date(year, 11, 9);
      var birthdayTime = birthday.getTime();

      if (time < birthdayTime) {
        birthday.setFullYear(year - 1);
        birthdayTime = birthday.getTime();
      }

      var days = (time - birthdayTime) / (24 * 60 * 60 * 1000);
      return days;
    }
  };

  formCloseButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    form.close();
  });

  formSubmitButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    var isValid = form.checkValidation();
    if (isValid) {
      form.saveCookies();
      formElement.submit();
    }
  });

  formNameInput.addEventListener('input', function(evt) {
    evt.preventDefault();
    form.checkValidation();
    form.saveCookies();
  });

  formTextInput.addEventListener('input', function(evt) {
    evt.preventDefault();
    form.checkValidation();
  });

  for (var i = 0; i < formStars.length; i++) {
    formStars[i].addEventListener('click', function() {
      var numStars = this.control.value;
      form.checkValidation(numStars);
      form.saveCookies();
    });
  }

  return form;
})();
