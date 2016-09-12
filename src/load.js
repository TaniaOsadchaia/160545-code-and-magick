'use strict';

var DEFAULT_LENGTH = 1000;
/**
* loadScript
* @param {String} url
* @param {Object} params = {from, to, filter:String}
* @param {function} callback
*/
var load = function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  var getRequestUrl = function() {
    var from = (params.from || 0);
    var to = (params.to || (from + DEFAULT_LENGTH));
    var filter = (params.filter || 'default');
    return url +
      '?from=' + from +
      '&to=' + to +
      '&filter=' + filter;
  };

  var onSuccess = function(evt) {
    var response = JSON.parse(evt.target.response);
    removeListeners();
    callback(response);
  };

  var onError = function() {
    removeListeners();
    callback(null);
  };

  var removeListeners = function() {
    xhr.removeEventListener('load', onSuccess);
    xhr.removeEventListener('error', onError);
  };

  xhr.open('GET', getRequestUrl());
  xhr.addEventListener('load', onSuccess);
  xhr.addEventListener('error', onError);
  xhr.send();
};

module.exports = load;
