'use strict';

(function() {
  var ReviewsList = require('./reviews');
  var ReviewForm = require('./form');
  var Game = require('./game');
  var Gallery = require('./gallery');

  var init = function() {
    var formOpenButton = document.querySelector('.reviews-controls-new');
    var gameContainer = document.querySelector('.demo');
    // create
    window.Game = Game;
    window.game = new Game(gameContainer);
    window.form = new ReviewForm();
    window.reviews = new ReviewsList();
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
    var photogallery = document.querySelector('.photogallery');
    var picturesUrls = [];
    var elems = photogallery.querySelectorAll('.photogallery-image');
    elems.forEach(function(item) {
      var img = item.querySelector('img');
      picturesUrls.push(img.src);
    });

    photogallery.addEventListener('click', function(evt) {
      evt.preventDefault();
      var target = evt.target;
      var src = target.src;
      var index = picturesUrls.indexOf(src);
      if (index >= 0) {
        window.gallery.show(index);
      }
    });

    window.gallery = new Gallery(picturesUrls);
  };

  init();
  initGallery();
})();
