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
    mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[card.offer.type];
    mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
    mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var popupFeatures = mapCardElement.querySelector('.popup__features');
    var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
    var features = card.offer.features;

    popupFeatureTemplate.forEach(function (child) {
      if (child.nodeType === 1) {
        if (features.some(function (feature) {
          return child.classList.contains('popup__feature--' + feature);
        })) {
          child.classList.add('popup__feature--visible');
          child.style.display = 'inline-block';
        } else {
          child.classList.remove('popup__feature--visible');
          child.style.display = 'none';
        }
      }
    });

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

  // Закрывает карточку объявления
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

  // Показывает карточку объявления
  var showMapCard = function (index, all) {
    removeMapCard();

    mapFiltersContainer.before(renderMapCard(all[index - 1]));
  };

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
