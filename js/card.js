'use strict';

(function () {

  // var renderMapCard = function (card) {
  //   var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  //   var mapCardElement = mapCardTemplate.cloneNode(true);
  //   var popupFeatures = mapCardElement.querySelector('.popup__features');
  //   var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
  //   var features = card.offer.features;
  //
  //   mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
  //   mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  //   mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
  //   mapCardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[card.offer.type];
  //   mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
  //   mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
  //   mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
  //   mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;
  //
  //   for (var i = 0; i < features.length; i++) {
  //     popupFeatureTemplate.forEach(function (child) {
  //       if (child.nodeType === 1) {
  //         if (child.classList.contains('popup__feature--' + features[i])) {
  //           child.style.display = 'inline-block';
  //           child.classList.add('popup__feature--visible');
  //         } else if (!child.classList.contains('popup__feature--visible')) {
  //           child.style.display = 'none';
  //         }
  //       }
  //     });
  //   }
  //
  //   var cardPhotos = mapCardElement.querySelector('.popup__photos');
  //   var cardPhoto = cardPhotos.querySelector('.popup__photo');
  //   var cardPhotoClone = cardPhotos.querySelector('.popup__photo').cloneNode(true);
  //   var photos = card.offer.photos;
  //
  //   for (var j = 0; j < photos.length; j++) {
  //     if (j === 0) {
  //       cardPhoto.src = photos[j];
  //       cardPhotos.appendChild(cardPhoto);
  //     } else {
  //       cardPhotoClone.src = photos[j];
  //       cardPhotos.appendChild(cardPhotoClone);
  //     }
  //   }
  //   // return mapCardElement;
  // };
  // window.card = {
  //   renderMapCard: renderMapCard;
  // };
})();
