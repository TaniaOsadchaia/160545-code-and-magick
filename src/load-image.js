'use strict';

/**
* loadImage
* @param {String} src
* @param {function} onSuccess
* @param {function} onError
*/
module.exports = function(src, onSuccess, onError) {
  var image = new Image();

  var onLoadSuccess = function() {
    setListening(false);
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  var onLoadError = function() {
    setListening(false);
    if (typeof onError === 'function') {
      onError();
    }
  };

  var setListening = function(isListening) {
    if (isListening) {
      image.addEventListener('load', onLoadSuccess);
      image.addEventListener('error', onLoadError);
    } else {
      image.removeEventListener('load', onLoadSuccess);
      image.removeEventListener('error', onLoadError);
    }
  };

  setListening(true);
  image.src = src;
};
