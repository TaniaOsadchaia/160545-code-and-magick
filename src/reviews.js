'use strict';

var reviews = null;

/**
* Запрос на сервер. JSONP
* @param {String} src
* @param {function} callback
*/
function scriptRequest(src, callback) {
	var success = false;
	var id = 'cb_' + String(Math.random()).slice(-6);

	window[id] = function(data) {
		success = true;
		delete window[id];
		callback(data);
	};

	var checkCallback = function() {
		var scriptElement = document.getElementById(id);
		scriptElement.parentNode.removeChild(scriptElement);

   		if (!success) {
   			delete window[id];
    		callback(null); // error
   		}
  	};

	var script = document.createElement('script');
	script.onreadystatechange = function() {
	    if (this.readyState == 'complete' || this.readyState == 'loaded') {
			this.onreadystatechange = null;
			setTimeout(checkCallback, 0);
		}
	}
	script.onload = checkCallback;
	script.onerror = checkCallback;
	script.id = id;
	script.src = src + '?callback=' + id;
	document.body.appendChild(script);
}

function onReviewsLoaded(data) {
	reviews = data;
	if (reviews instanceof Array) {
		// success
		console.log('Loaded ' + reviews.length + ' reviews');
	} else {
		// error
		console.error('Can\'t load reviews');
	}
}

scriptRequest('http://localhost:1506/api/reviews', onReviewsLoaded);