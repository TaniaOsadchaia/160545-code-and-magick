'use strict';

var utils = require('./utils');
var Component = require('./component');
var load = require('./load');
var Review = require('./review');

var REQUEST_URL = 'http://localhost:1506/api/reviews';
var PAGE_SIZE = 3;

var FILTER_KEY = 'reviews_filter';
var FILTER_DEFAULT = 'default';

var ReviewsList = function() {
  Component.call(this, document.querySelector('.reviews'));

  this.reviews = [];
  this.pageNumber = 0;
  this.filterId = FILTER_DEFAULT;

  this.btnMore = document.querySelector('.reviews-controls-more');

  this.onLoadComplete = this.onLoadComplete.bind(this);
  this.addReview = this.addReview.bind(this);

  this.show();
};

utils.inherit(ReviewsList, Component);

ReviewsList.prototype.show = function() {
  this.btnMore.classList.remove('invisible');
  this.initFilter();
  this.loadCurrentPage();
  Component.prototype.show.call(this);
};

ReviewsList.prototype.initFilter = function() {
  var filter = localStorage.getItem(FILTER_KEY);
  this.filterId = filter ? filter : FILTER_DEFAULT;
  this.checkFilterElement(this.filterId);
};

ReviewsList.prototype.clearReviews = function() {
  this.reviews.forEach(function(review) {
    review.destroy();
  });
  this.reviews = [];
  this.pageNumber = 0;
};

ReviewsList.prototype.checkFilterElement = function(filter) {
  var elem = document.getElementById(filter);
  if (elem) {
    elem.checked = true;
  }
};

ReviewsList.prototype.onClick = function(evt) {
  Component.prototype.onClick.call(this, evt);
  switch (evt.target) {

    case this.btnMore:
      this.pageNumber++;
      this.loadCurrentPage();
      break;

    default:
      if (evt.target.classList.contains('reviews-filter-item')) {
        this.setFilter(utils.getControl(evt.target).id);
        this.clearReviews();
        this.loadCurrentPage();
      }
  }
};

ReviewsList.prototype.loadCurrentPage = function() {
  var params = {
    from: this.pageNumber * PAGE_SIZE,
    to: this.pageNumber * PAGE_SIZE + PAGE_SIZE,
    filter: this.getFilter()
  };
  load(REQUEST_URL, params, this.onLoadComplete);
};

ReviewsList.prototype.onLoadComplete = function(reviewsData) {
  if (reviewsData instanceof Array) {
    reviewsData.forEach(this.addReview);
  }
};

ReviewsList.prototype.addReview = function(reviewData) {
  var review = new Review(reviewData);
  this.reviews.push(review);
};

ReviewsList.prototype.setFilter = function(filter) {
  this.filterId = filter;
  this.checkFilterElement(this.filterId);
  localStorage.setItem(FILTER_KEY, filter);
};

ReviewsList.prototype.getFilter = function() {
  return this.filterId;
};

module.exports = ReviewsList;
