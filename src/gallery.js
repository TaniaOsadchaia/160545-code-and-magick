'use strict';

var Gallery = function(picturesUrls) {
  this.pictures = picturesUrls;
  this.activePicture = 0;

  this.elemGallery = document.querySelector('.overlay-gallery');
  this.elemNumCurrent = document.querySelector('preview-number-current');
  this.elemNumTotal = document.querySelector('preview-number-total');

  this.btnClose = document.querySelector('.overlay-gallery-close');
  this.btnLeft = document.querySelector('.overlay-gallery-control-left');
  this.btnRight = document.querySelector('.overlay-gallery-control-right');

  var that = this;

  this.onCloseClick = function() {
    that.hide();
  };

  this.onLeftClick = function() {
    that.hide();
  };

  this.onRightClick = function() {
    that.hide();
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

  //var pictureUrl = this.pictures[activePicture];
};

module.exports = Gallery;
