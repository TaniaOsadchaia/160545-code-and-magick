'use strict';

var loadImage = require('./load-image');

/**
* drawReview
* @param {HTMLElement} reviewElement
* @param {object} data
*/
var drawReview = function(reviewElement, data) {
  var drawUserPhoto = function() {
    var src = data.author.picture;

    var onLoadSuccess = function() {
      var size = '124px';
      var img = reviewElement.querySelector('.review-author');
      img.src = src;
      img.width = size;
      img.height = size;
      img.alt = data.author.name;
      img.title = data.author.name;
    };

    var onLoadError = function() {
      reviewElement.classList.add('review-load-failure');
    };

    loadImage(src, onLoadSuccess, onLoadError);
  };

  var setInnerHtml = function(className, value) {
    reviewElement.querySelector('.' + className).innerHTML = String(value);
  };

  setInnerHtml('review-rating', data.rating);
  setInnerHtml('review-text', data.description);
  drawUserPhoto();
};

module.exports = drawReview;
