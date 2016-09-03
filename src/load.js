'use strict';

/**
* loadScript
* @param {String} src
* @param {function} callback
*/
var loadScript = function(src, callback) {
  var success = false;
  var id = 'cb_' + String(Math.random()).slice(-6);

  window[id] = function(data) {
    success = true;
    delete window[id];
    callback(data);
  };

  var checkCallback = function() {
    removeScript();

    if (!success) {
      delete window[id];
      callback(null); // error
    }
  };

  var appendScript = function() {
    var script = document.createElement('script');

    var setListening = function(value) {
      if (value) {
        script.addEventListener('readystatechange', onChangeState);
        script.addEventListener('load', onLoad);
        script.addEventListener('error', onError);
      } else {
        script.removeEventListener('readystatechange', onChangeState);
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
      }
    };

    var onLoad = function() {
      setListening(false);
      checkCallback();
    };

    var onError = function() {
      setListening(false);
      checkCallback();
    };

    var onChangeState = function(evt) {
      if (evt.target.readyState === 'complete' || evt.target.readyState === 'loaded') {
        setListening(false);
        setTimeout(checkCallback, 0);
      }
    };

    setListening(true);
    script.id = id;
    script.src = src + '?callback=' + id;
    document.body.appendChild(script);
  };

  var removeScript = function() {
    var script = document.getElementById(id);
    script.parentNode.removeChild(script);
  };

  appendScript();
};

module.exports = loadScript;
