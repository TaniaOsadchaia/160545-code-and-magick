'use strict';

(function() {
  var initReviews = require('./reviews');
  var createForm = require('./form');
  var Game = require('./game');
  var Gallery = require('./gallery');

  var init = function() {
    var formOpenButton = document.querySelector('.reviews-controls-new');
    var gameContainer = document.querySelector('.demo');
    // create
    window.Game = Game;
    window.game = new window.Game(gameContainer);
    window.form = createForm();
    // behaviour
    formOpenButton.onclick = function(evt) {
      evt.preventDefault();
      window.form.open(function() {
        window.game.setGameStatus(window.Game.Verdict.PAUSE);
        window.game.setDeactivated(true);
      });
    };
    window.form.onClose = function() {
      window.game.setDeactivated(false);
    };
    // start
    window.game.initializeLevelAndStart();
    window.game.setGameStatus(window.Game.Verdict.INTRO);
  };

  var initGallery = function() {
    var picturesUrls = [];
    var img;
    var elems = document.querySelectorAll('.photogallery-image');
    for (var i = 0; i < elems.length; i++) {
      img = elems[i].querySelector('img');
      picturesUrls.push(img.src);
      (function() {
        var index = i;
        img.addEventListener('click', function() {
          window.gallery.show(index);
        });
      })();
    }
    window.gallery = new Gallery(picturesUrls);
  };

  init();
  initReviews();
  initGallery();
})();
