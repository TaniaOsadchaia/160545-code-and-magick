'use strict';

var reviews = null;

/**
* Запрос на сервер. JSONP
* @param {String} src
* @param {function} callback
*/
var scriptRequest = function(src, callback) {
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

var loadAndShowReviews = function() {
  var reviewsSrc = 'http://localhost:1506/api/reviews';

  var setFiltersVisible = function(value) {
    var htmlElement = document.querySelector('.reviews-filter');
    if (htmlElement) {
      if (value) {
        htmlElement.classList.remove('invisible');
      } else {
        htmlElement.classList.add('invisible');
      }
    }
  };

  var fillHtmlElement = function(htmlElement, data) {
    var fillImage = function() {
      var image = new Image();

      var onLoadSuccess = function() {
        var size = '124px';
        var img = htmlElement.querySelector('.review-author');
        img.src = image.src;
        img.width = size;
        img.height = size;
        img.alt = data.author.name;
        img.title = data.author.name;

        setListeners(false);
      };

      var onLoadError = function() {
        setListeners(false);

        htmlElement.classList.add('review-load-failure');
      };

      var setListeners = function(value) {
        if (value) {
          image.addEventListener('load', onLoadSuccess);
          image.addEventListener('error', onLoadError);
        } else {
          image.removeEventListener('load', onLoadSuccess);
          image.removeEventListener('error', onLoadError);
        }
      };

      setListeners(true);
      image.src = data.author.picture;
    };

    var setInnerHtml = function(className, value) {
      htmlElement.querySelector('.' + className).innerHTML = String(value);
    };

    setInnerHtml('review-rating', data.rating);
    setInnerHtml('review-text', data.description);
    fillImage(htmlElement, data);
  };

  var show = function() {
    var template = document.querySelector('#review-template');
    var parent = document.querySelector('.reviews-list');
    var htmlElement;
    var clone;

    reviews.forEach(function(item) {
      clone = document.importNode(template.content, true);
      htmlElement = clone.children[0];
      fillHtmlElement(htmlElement, item);
      parent.appendChild(htmlElement);
    });
  };

  var onLoadedSuccess = function(data) {
    reviews = data;
    show();
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
  scriptRequest(reviewsSrc, onLoaded);
};

loadAndShowReviews();



