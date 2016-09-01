'use strict';

(function() {
  var initReviews = require('./reviews');
  var createForm = require('./form');
  var getGameClass = require('./game');

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

  init();
  initReviews();
})();
