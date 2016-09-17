'use strict';

var loadImage = require('./load-image');

var QUIZ_CLASS = 'review-quiz-answer';
var ACTIVE_CLASS = 'review-quiz-answer-active';
var USER_PHOTO_SIZE = '124px';

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
  this.reviewQuiz = this.element.querySelector('.review-quiz');

  this.onQuizClick = this.onQuizClick.bind(this);
  this.onLoadUserPhotoSuccess = this.onLoadUserPhotoSuccess.bind(this);
  this.onLoadUserPhotoError = this.onLoadUserPhotoError.bind(this);
};

Review.prototype.init = function() {
  this.setInnerHtml('review-rating', this.data.rating);
  this.setInnerHtml('review-text', this.data.description);
  loadImage(this.data.author.picture, this.onLoadUserPhotoSuccess, this.onLoadUserPhotoError);
  this.addListeners();
};

Review.prototype.setInnerHtml = function(className, value) {
  this.element.querySelector('.' + className).innerHTML = String(value);
};

Review.prototype.onLoadUserPhotoSuccess = function(image) {
  var img = this.element.querySelector('.review-author');
  img.src = image.src;
  img.width = USER_PHOTO_SIZE;
  img.height = USER_PHOTO_SIZE;
  img.title = this.data.author.name;
  img.alt = this.data.author.name;
};

Review.prototype.onLoadUserPhotoError = function() {
  this.element.classList.add('review-load-failure');
};

Review.prototype.addListeners = function() {
  this.reviewQuiz.addEventListener('click', this.onQuizClick);
};

Review.prototype.removeListeners = function() {
  this.reviewQuiz.removeEventListener('click', this.onQuizClick);
};

Review.prototype.onQuizClick = function(evt) {
  var elems;
  if (evt.target.classList.contains(QUIZ_CLASS)) {
    elems = this.element.querySelectorAll('.' + QUIZ_CLASS);
    elems.forEach(function(elem) {
      if (elem === evt.target) {
        elem.classList.add(ACTIVE_CLASS);
      } else {
        elem.classList.remove(ACTIVE_CLASS);
      }
    });
  }
};

Review.prototype.destroy = function() {
  this.removeListeners();
  this.element.parentNode.removeChild(this.element);
  this.element = null;
  this.data = null;
};

module.exports = Review;
