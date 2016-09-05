'use strict';

var loadImage = require('./load-image');

var template = document.querySelector('#review-template');
var parent = document.querySelector('.reviews-list');

var createReviewElement = function() {
  var cloneNode = document.importNode(template.content, true);
  var cloneElement = cloneNode.querySelector('.review');
  parent.appendChild(cloneElement);
  return cloneElement;
};

var Review = function(data) {
  this.data = data;
  this.element = createReviewElement();

  var self = this;

  this.onQuizAnswerClick = function(evt) {
    var activeClass = 'review-quiz-answer-active';
    var elems = self.element.querySelectorAll('.review-quiz-answer');
    elems.forEach(function(elem) {
      if (elem === evt.target) {
        elem.classList.add(activeClass);
      } else {
        elem.classList.remove(activeClass);
      }
    });
  };
};

Review.prototype.draw = function() {
  var self = this;
  var drawUserPhoto = function() {
    var src = self.data.author.picture;

    var onLoadSuccess = function() {
      var size = '124px';
      var img = self.element.querySelector('.review-author');
      img.src = src;
      img.width = size;
      img.height = size;
      img.title = self.data.author.name;
      img.alt = self.data.author.name;
    };

    var onLoadError = function() {
      self.element.classList.add('review-load-failure');
    };

    loadImage(src, onLoadSuccess, onLoadError);
  };

  var setInnerHtml = function(className, value) {
    self.element.querySelector('.' + className).innerHTML = String(value);
  };

  setInnerHtml('review-rating', self.data.rating);
  setInnerHtml('review-text', self.data.description);
  drawUserPhoto();
  this.setListeners(true);
};

Review.prototype.setListeners = function(isListening) {
  var self = this;
  var elems = this.element.querySelectorAll('.review-quiz-answer');
  elems.forEach(function(elem) {
    if (isListening) {
      elem.addEventListener('click', self.onQuizAnswerClick);
    } else {
      elem.removeEventListener('click', self.onQuizAnswerClick);
    }
  });
};

Review.prototype.remove = function() {
  this.setListeners(false);
};

module.exports = Review;
