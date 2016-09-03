'use strict';

(function() {
  var initReviews = require('./reviews');
  var createForm = require('./form');
  var getGameClass = require('./game');
  var Gallery = require('./gallery');

  var init = function() {
    var formOpenButton = document.querySelector('.reviews-controls-new');
    var gameContainer = document.querySelector('.demo');
    // create
    window.Game = getGameClass();
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
    var elemsList = document.querySelectorAll('.photogallery-image');
    elemsList.forEach(function(item) {
      var img = item.querySelector('img');
      var url = img.src;
      picturesUrls.push(url);
      img.addEventListener('click', function() {
        window.gallery.show(0);
      });
    });
    window.gallery = new Gallery(picturesUrls);
  };

  init();
  initReviews();
  initGallery();
})();
