'use strict';

(function () {
  // var MIN_X = 0 - window.data.Pin / 2;
  // var MAX_X = 1200 - window.data.Pin / 2;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  // var form = document.querySelector('.ad-form');
  // var address = form.querySelector('#address');

  var renderMapCard = function (card) {
    var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var mapCardElement = mapCardTemplate.cloneNode(true);
    var popupFeatures = mapCardElement.querySelector('.popup__features');
    var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
    var features = card.offer.features;

    mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = window.data.TYPE_OF_HOUSE_CARD[card.offer.type];
    mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
    mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

    for (var i = 0; i < features.length; i++) {
      popupFeatureTemplate.forEach(function (child) {
        if (child.nodeType === 1) {
          if (child.classList.contains('popup__feature--' + features[i])) {
            child.style.display = 'inline-block';
            child.classList.add('popup__feature--visible');
          } else if (!child.classList.contains('popup__feature--visible')) {
            child.style.display = 'none';
          }
        }
      });
    }

    var cardPhotos = mapCardElement.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    var cardPhotoClone = cardPhotos.querySelector('.popup__photo').cloneNode(true);
    var photos = card.offer.photos;

    for (var j = 0; j < photos.length; j++) {
      if (j === 0) {
        cardPhoto.src = photos[j];
        cardPhotos.appendChild(cardPhoto);
      } else {
        cardPhotoClone.src = photos[j];
        cardPhotos.appendChild(cardPhotoClone);
      }
    }
    // return mapCardElement;
  };

  // Ограничивает перемещение метки по горизонтали
  // var setMinMaxX = function (left) {
  //   if (left < MIN_X) {
  //     return MIN_X;
  //   } else if (left < MAX_X) {
  //     return MAX_X;
  //   } else {
  //     return left;
  //   }
  // };

  // Ограничивает перемещение метки по вертикали
  // var setMinMaxY = function (top) {
  //   if (top < window.data.MIN_Y) {
  //     return window.data.MIN_Y;
  //   } else if (top < window.data.MAX_Y) {
  //     return window.data.MAX_Y;
  //   } else {
  //     return top;
  //   }
  // };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      // mapPinMain.style.top = setMinMaxY(top) + 'px';
      // mapPinMain.style.left = setMinMaxX(left) + 'px';
      //
      // address.value = window.pin.setCoordinates();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // address.value = window.pin.setCoordinates();
      document.removeEventListener('mousmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.addEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.card = {
    renderMapCard: renderMapCard
  };
})();
