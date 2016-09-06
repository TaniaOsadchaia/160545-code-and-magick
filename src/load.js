'use strict';

/**
* loadScript
* @param {String} url
* @param {Object} params = {from, to, filter:String}
* @param {function} callback
*/
var load = function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  var getRequestUrl = function() {
    return url +
      '?from=' + (params.from || 0) +
      '&to=' + (params.to || Infinity) +
      '&filter=' + (params.filter || 'default');
  };

  var onSuccess = function(evt) {
    var datas = JSON.parse(evt.target.response);
    removeListeners();
    callback(datas);
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
