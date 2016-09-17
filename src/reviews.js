'use strict';

var load = require('./load');
var Review = require('./review');

var REQUEST_URL = 'http://localhost:1506/api/reviews';
var PAGE_SIZE = 3;

var FILTER_KEY = 'reviews_filter';
var FILTER_DEFAULT = 'default';

var ReviewsList = function() {
  this.reviews = [];
  this.pageNumber = 0;
  this.filterId = FILTER_DEFAULT;

  this.btnMore = document.querySelector('.reviews-controls-more');
  this.elemFilters = document.querySelector('.reviews-filter');

  this.onMoreClick = this.onMoreClick.bind(this);
  this.onFilterClick = this.onFilterClick.bind(this);
  this.onLoadComplete = this.onLoadComplete.bind(this);
  this.addReview = this.addReview.bind(this);

  this.init();
};

ReviewsList.prototype.clearReviews = function() {
  this.reviews.forEach(function(review) {
    review.destroy();
  });
  this.reviews = [];
  this.pageNumber = 0;
};

ReviewsList.prototype.init = function() {
  this.btnMore.classList.remove('invisible');
  this.initFilter();
  this.loadCurrentPage();
  this.addEventListeners();
};

ReviewsList.prototype.initFilter = function() {
  var filter = localStorage.getItem(FILTER_KEY);
  this.filterId = filter ? filter : FILTER_DEFAULT;
  this.checkFilterElement(this.filterId);
};

ReviewsList.prototype.checkFilterElement = function(filter) {
  var elem = document.getElementById(filter);
  if (elem) {
    elem.checked = true;
  }
};

ReviewsList.prototype.addEventListeners = function() {
  this.btnMore.addEventListener('click', this.onMoreClick);
  this.elemFilters.addEventListener('click', this.onFilterClick, true);
};

ReviewsList.prototype.removeEventListeners = function() {
  this.btnMore.removeEventListeners('click', this.onMoreClick);
  this.elemFilters.removeEventListeners('click', this.onFilterClick, true);
};

ReviewsList.prototype.onMoreClick = function() {
  this.pageNumber++;
  this.loadCurrentPage();
};

ReviewsList.prototype.onFilterClick = function(evt) {
  if (evt.target.classList.contains('reviews-filter-item')) {
    this.setFilter(evt.target.control.id);
    this.clearReviews();
    this.loadCurrentPage();
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
  review.init();
  this.reviews.push(review);
};

ReviewsList.prototype.setFilter = function(filter) {
  this.filterId = filter;
  localStorage.setItem(FILTER_KEY, filter);
};

ReviewsList.prototype.getFilter = function() {
  return this.filterId;
};

module.exports = ReviewsList;
