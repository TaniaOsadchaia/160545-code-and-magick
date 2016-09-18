'use strict';

var utils = require('./utils');
var Component = require('./component');

var Gallery = function(picturesUrls) {
  Component.call(this, document.querySelector('.overlay-gallery'));

  this.pictures = picturesUrls;
  this.activePicture = 0;

  this.elemNumCurrent = document.querySelector('.preview-number-current');
  this.elemNumTotal = document.querySelector('.preview-number-total');
  this.image = null;
  this.imageContainer = document.querySelector('.overlay-gallery-preview');

  this.btnClose = document.querySelector('.overlay-gallery-close');
  this.btnLeft = document.querySelector('.overlay-gallery-control-left');
  this.btnRight = document.querySelector('.overlay-gallery-control-right');
};

utils.inherit(Gallery, Component);

Gallery.prototype.show = function(activePicture) {
  this.setActivePicture(activePicture);
  Component.prototype.show.call(this);
};

Gallery.prototype.setActivePicture = function(activePicture) {
  this.activePicture = activePicture;

  if (this.image && this.image.parentNode) {
    this.image.parentNode.removeChild(this.image);
  }
  this.image = new Image();
  this.image.src = this.pictures[activePicture];
  this.imageContainer.appendChild(this.image);

  this.elemNumCurrent.innerHTML = String(activePicture + 1);
  this.elemNumTotal.innerHTML = String(this.pictures.length);
};

Gallery.prototype.onClick = function(evt) {
  Component.prototype.onClick.call(this, evt);
  switch (evt.target) {

    case this.btnClose:
      this.hide();
      break;

    case this.btnLeft:
      if (this.activePicture > 0) {
        this.setActivePicture(this.activePicture - 1);
      }
      break;

    case this.btnRight:
      if (this.activePicture < this.pictures.length - 1) {
        this.setActivePicture(this.activePicture + 1);
      }
      break;
  }
};

module.exports = Gallery;
