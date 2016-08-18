'use strict';

window.form = (function() {
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
      formContainer.classList.remove('invisible');
      this.checkValidation();
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

    getNumStars: function() {
      return document.querySelector('input[name="review-mark"]:checked').value;
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
      formElement.submit();
    }
  });

  formNameInput.addEventListener('input', function(evt) {
    evt.preventDefault();
    form.checkValidation();
  });

  formTextInput.addEventListener('input', function(evt) {
    evt.preventDefault();
    form.checkValidation();
  });

  for (var i = 0; i < formStars.length; i++) {
    formStars[i].addEventListener('click', function() {
      var numStars = this.control.value;
      form.checkValidation(numStars);
    });
  }

  return form;
})();
