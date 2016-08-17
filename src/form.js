'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var formNameInput = document.querySelector('.review-form-field-name');
  var formNameReminder = document.querySelector('.review-fields-name');
  var formTextInput = document.querySelector('.review-form-field-text');
  var formTextReminder = document.querySelector('.review-fields-text');
  var formStars = document.querySelectorAll('.review-mark-label');

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

    checkValidation: function() {
      var isValidName = this.checkValidationName();
      var isValidText = this.checkValidationText(this.getNumStars());
      var isValid = isValidName && isValidText;
      return isValid;
    },

    checkValidationName: function() {
      var isValid = (formNameInput.value !== '');
      this.setVisible(formNameReminder, !isValid);
      return isValid;
    },

    checkValidationText: function(numStars) {
      var isValid = (numStars >= 3 || formTextInput.value !== '');
      this.setVisible(formTextReminder, !isValid);
      return isValid;
    },

    setVisible: function(obj, value) {
      if (value) {
        obj.classList.remove('invisible');
      } else {
        obj.classList.add('invisible');
      }
    },

    getNumStars: function() {
      return document.querySelector('input[name="review-mark"]:checked').value;
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formSubmitButton.onclick = function(evt) {
    var isValid = form.checkValidation();
    if (!isValid) {
      evt.preventDefault();
    }
  };

  formNameInput.oninput = function(evt) {
    evt.preventDefault();
    form.checkValidationName();
  };

  formTextInput.oninput = function(evt) {
    evt.preventDefault();
    form.checkValidationText();
  };

  for (var i = 0; i < formStars.length; i++) {
    formStars[i].onclick = function() {
      var numStars = this.control.value;
      form.checkValidationText(numStars);
    };
  }

  return form;
})();
