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

  this.onQuizClick = function(evt) {
    var elems;
    var quizClass = 'review-quiz-answer';
    var activeClass = 'review-quiz-answer-active';
    if (evt.target.classList.contains(quizClass)) {
      elems = self.element.querySelectorAll('.' + quizClass);
      elems.forEach(function(elem) {
        if (elem === evt.target) {
          elem.classList.add(activeClass);
        } else {
          elem.classList.remove(activeClass);
        }
      });
    }
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

  this.addListeners();
};

Review.prototype.addListeners = function() {
  var elem = this.element.querySelector('.review-quiz');
  elem.addEventListener('click', this.onQuizClick);
};

Review.prototype.remove = function() {
  var elem = this.element.querySelector('.review-quiz');
  elem.removeEventListener('click', this.onQuizClick);
};

module.exports = Review;
