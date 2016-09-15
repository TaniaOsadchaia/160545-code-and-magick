'use strict';

var load = require('./load');
var Review = require('./review');

/**
* createReviews
*/
var createReviews = function() {
  var REQUEST_URL = 'http://localhost:1506/api/reviews';
  var PAGE_SIZE = 3;

  var FILTER_KEY = 'reviews_filter';
  var FILTER_DEFAULT = 'default';

  var reviews = [];
  var pageNumber = 0;
  var filterId = FILTER_DEFAULT;

  var btnMore = document.querySelector('.reviews-controls-more');
  var elemFilters = document.querySelector('.reviews-filter');

  var clearReviews = function() {
    reviews.forEach(function(review) {
      review.destroy();
    });
    reviews = [];
    pageNumber = 0;
  };

  var loadCurrentPage = function() {
    var params = {
      from: pageNumber * PAGE_SIZE,
      to: pageNumber * PAGE_SIZE + PAGE_SIZE,
      filter: filterId
    };
    load(REQUEST_URL, params, onLoad);
  };

  var onLoad = function(reviewsData) {
    var review;
    if (reviewsData instanceof Array) {
      reviewsData.forEach(function(reviewData) {
        review = new Review(reviewData);
        review.draw();
        reviews.push(review);
      });
    }
  };

  var initBtnMore = function() {
    btnMore.classList.remove('invisible');
    btnMore.addEventListener('click', onMoreClick);
  };

  var onMoreClick = function() {
    pageNumber++;
    loadCurrentPage();
  };

  var initFilters = function() {
    elemFilters.addEventListener('click', onFilterClick, true);
  };

  var onFilterClick = function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      setFilter(evt.target.control.id);
      clearReviews();
      loadCurrentPage();
    }
  };

  var setFilter = function(filter) {
    filterId = filter;
    localStorage.setItem(FILTER_KEY, filter);
  };

  var loadCurrentFilter = function() {
    var filter = localStorage.getItem(FILTER_KEY);
    filterId = filter ? filter : FILTER_DEFAULT;
    checkFilterElement(filterId);
  };

  var checkFilterElement = function(filter) {
    var elem = document.getElementById(filter);
    if (elem) {
      elem.checked = true;
    }
  };

  initBtnMore();
  initFilters();
  loadCurrentFilter();
  loadCurrentPage();
};

module.exports = createReviews;
