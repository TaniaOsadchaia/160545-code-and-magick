'use strict';

var loadScript = require('./load');
var drawReview = require('./review');

/**
* createReviews
*/
var createReviews = function() {
  var reviews = null;
  var reviewsSrc = 'http://localhost:1506/api/reviews';

  var setFiltersVisible = function(isVisible) {
    var reviewsFilter = document.querySelector('.reviews-filter');
    if (reviewsFilter) {
      if (isVisible) {
        reviewsFilter.classList.remove('invisible');
      } else {
        reviewsFilter.classList.add('invisible');
      }
    }
  };

  var show = function() {
    var template = document.querySelector('#review-template');
    var parent = document.querySelector('.reviews-list');
    var cloneNode;
    var cloneElement;

    reviews.forEach(function(review) {
      cloneNode = document.importNode(template.content, true);
      cloneElement = cloneNode.querySelector('.review');
      drawReview(cloneElement, review);
      parent.appendChild(cloneElement);
    });
  };

  var onLoadedSuccess = function(data) {
    reviews = data;
    show();
  };

  var onLoadedError = function() {
    reviews = null;
    console.error('Can\'t load reviews');
  };

  var onLoaded = function(data) {
    if (data instanceof Array) {
      onLoadedSuccess(data);
    } else {
      onLoadedError();
    }
    setFiltersVisible(true);
  };

  setFiltersVisible(false);
  loadScript(reviewsSrc, onLoaded);
};

module.exports = createReviews;
