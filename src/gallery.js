'use strict';

var Gallery = function(picturesUrls) {
  this.pictures = picturesUrls;
  this.activePicture = 0;

  this.elemGallery = document.querySelector('.overlay-gallery');
  this.elemNumCurrent = document.querySelector('.preview-number-current');
  this.elemNumTotal = document.querySelector('.preview-number-total');
  this.image = null;
  this.imageContainer = document.querySelector('.overlay-gallery-preview');

  this.btnClose = document.querySelector('.overlay-gallery-close');
  this.btnLeft = document.querySelector('.overlay-gallery-control-left');
  this.btnRight = document.querySelector('.overlay-gallery-control-right');

  var self = this;

  this.onCloseClick = function() {
    self.hide();
  };

  this.onLeftClick = function() {
    if (self.activePicture > 0) {
      self.setActivePicture(self.activePicture - 1);
    }
  };

  this.onRightClick = function() {
    if (self.activePicture < self.pictures.length - 1) {
      self.setActivePicture(self.activePicture + 1);
    }
  };
};

Gallery.prototype.show = function(activePicture) {
  this.btnClose.addEventListener('click', this.onCloseClick);
  this.btnLeft.addEventListener('click', this.onLeftClick);
  this.btnRight.addEventListener('click', this.onRightClick);

  this.elemGallery.classList.remove('invisible');

  this.setActivePicture(activePicture);
};

Gallery.prototype.hide = function() {
  this.btnClose.removeEventListener('click', this.onCloseClick);
  this.btnLeft.removeEventListener('click', this.onLeftClick);
  this.btnRight.removeEventListener('click', this.onRightClick);

  this.elemGallery.classList.add('invisible');
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

module.exports = Gallery;
