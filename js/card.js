'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var TYPE_OF_HOUSE_CARD = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);

  var renderMapCard = function (card) {
    // var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    // var mapCardElement = mapCardTemplate.cloneNode(true);

    // var popupFeatures = mapCardElement.querySelector('.popup__features');
    // var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
    var cardFeatures = mapCardElement.querySelector('.popup__features');
    var features = card.offer.features;

    mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[card.offer.type];
    mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
    mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

    // for (var i = 0; i < features.length; i++) {
    //   popupFeatureTemplate.forEach(function (child) {
    //     if (child.nodeType === 1) {
    //       if (child.classList.contains('popup__feature--' + features[i])) {
    //         child.style.display = 'inline-block';
    //         child.classList.add('popup__feature--visible');
    //       } else if (!child.classList.contains('popup__feature--visible')) {
    //         child.style.display = 'none';
    //       }
    //     }
    //   });
    // }

    while (cardFeatures.firstChild) {
      cardFeatures.removeChild(cardFeatures.firstChild);
    }
    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('.popup__feature');
      feature.classList.add('.popup__feature--' + features[i]);
      cardFeatures.appendChild(feature);
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

    return mapCardElement;
  };

  // var getAds = function (data) {
  //   var mapPins = document.querySelector('.map__pins');
  //   var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  //   var showMapCard = function (index) {
  //     var activeCard = document.querySelector('.map__card');
  //     if (activeCard) {
  //       activeCard.remove();
  //     }
  //     renderMapCard(data, index);
  //     var mapCardClose = mapCardElement.querySelector('.popup__close');
  //     mapCardClose.addEventListener('click', onRemoveMapCard);
  //     document.addEventListener('keydown', onRemoveMapCardEsc);
  //   };
  //   var onRemoveMapCard = function () {
  //     removeMapCard();
  //     document.removeEventListener('keydown', onRemoveMapCardEsc);
  //   };
  //   var onRemoveMapCardEsc = function (event) {
  //     if (event.key === 'Escape') {
  //       onRemoveMapCard();
  //     }
  //   };
  //   pins.forEach(function (item, index) {
  //     item.addEventListener('click', function () {
  //       showMapCard(index);
  //     });
  //   });
  // };

  var onRemoveMapCard = function () {
    removeMapCard();
    document.removeEventListener('keydown', onRemoveMapCardEsc);
  };

  var onRemoveMapCardEsc = function (event) {
    if (event.key === 'Escape') {
      onRemoveMapCard();
    }
  };

  var mapCardClose = mapCardElement.querySelector('.popup__close');
  mapCardClose.addEventListener('click', onRemoveMapCard);
  document.addEventListener('keydown', onRemoveMapCardEsc);

  // function showMapCard(advert) {
  //   var mapCard = map.querySelector('.map__card');
  //   if (mapCard) {
  //     mapCard.remove();
  //   }
  //   renderMapCard(advert);
  //   mapFiltersContainer.before(renderMapCard(mapCardElement));
  // }

  // Показывает карточку объявления
  var showMapCard = function () {
    removeMapCard();

    mapFiltersContainer.before(renderMapCard(mapCardElement));
  };

  // var showMapCard = function (number) {
  // var mapPin = document.querySelectorAll('.map__pin');
  // var mapCards = document.querySelectorAll('.map__card');
  // mapPin[number].addEventListener('click', function (event) {
  //   if (event.button === 0 || event.key === 'Enter') {
  //     removeMapCard();
  //     mapCards[number - 1].classList.remove('hidden');
  //     document.addEventListener('keydown', onRemoveMapCardEsc);
  //     mapCards[number - 1].querySelector('.popup__close').addEventListener('click', onRemoveMapCard);
  //   }
  // });
  // removeMapCard();
  // var id = Number(target.dataset.id);
  // var targetOffer = offerData.find(function (offer) {
  //   return offer.id === id;
  // },
  // window.pin.removePinActive();

  // mapFiltersContainer.before(mapCardElement);
  // map.insertBefore(renderMapCard(targetOffer), mapFiltersContainer);
  // };

  // Удаляет карточку объявления
  var removeMapCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    removeMapCard: removeMapCard,
    showMapCard: showMapCard,
    renderMapCard: renderMapCard
  };

})();
