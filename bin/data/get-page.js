'use strict';

module.exports = function(list, from, to) {
  var pageList = list.slice(from, to);
  return pageList;
};
