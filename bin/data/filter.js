'use strict';

module.exports = function(list, filterID) {
  var filteredList = list.slice();
  var minCreatedDate;
  
  switch (filterID) {

    case 'reviews-recent':

      minCreatedDate = new Date() - 24 * 60 *60 * 1000;
      filteredList = filteredList.filter(function(item) {
        return item.created >= minCreatedDate;
      });

      filteredList.sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'reviews-good':

      filteredList = filteredList.filter(function(item) {
        return item.rating >= 3;
      });

      filteredList.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-bad':
    
      filteredList = filteredList.filter(function(item) {
        return item.rating < 3;
      });

      filteredList.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case 'reviews-popular':

      filteredList.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return filteredList;
};
