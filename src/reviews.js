'use strict';

var load = require('./load');
var Review = require('./review');

/**
* createReviews
*/
var createReviews = function() {
  var reviews = [];
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

  var onLoadedSuccess = function(data) {
    data.forEach(function(reviewData) {
      var review = new Review(reviewData);
      review.draw();
      reviews.push(review);
    });
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
  load(reviewsSrc, null, onLoaded);
};

module.exports = createReviews;
