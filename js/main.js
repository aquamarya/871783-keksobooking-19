'use strict';

var PRICES = [
  10000,
  50000
];
var TYPE_OF_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TYPE_OF_HOUSE_CARD = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var ROOMS = [
  1,
  3
];
var GUESTS = [
  1,
  2
];
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var FOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN = {
  width: 50,
  height: 70
};
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var offsetX = PIN.width / 2;
var offsetY = PIN.height / 2;
var MAX_AMOUNT = 8;

// Создает случайный элемент массива
var getRandomItem = function (max) {
  return Math.floor(Math.random() * max);
};

// Возвращает результат, включая максимум и минимум
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var adverts = [];

// Создает объявление из массива данных
var getAdvert = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, MAX_AMOUNT) + '.png',
    },
    offer: {
      title: 'Заголовок предложения',
      address: '600, 350', // "{{location.x}}, {{location.y}}"
      price: getRandomIntInclusive(PRICES[0], PRICES[1]),
      type: getRandomItem(TYPE_OF_HOUSE.length),
      rooms: getRandomIntInclusive(ROOMS[0], ROOMS[1]),
      guests: getRandomIntInclusive(GUESTS[0], GUESTS[1]),
      checkin: getRandomItem(CHECKIN.length),
      checkout: getRandomItem(CHECKOUT.length),
      features: getRandomItem(FEATURES.length),
      description: 'Описание',
      photos: getRandomItem(FOTOS.length)
    },
    location: {
      x: getRandomIntInclusive(MIN_X, MAX_X),
      y: getRandomIntInclusive(MIN_Y, MAX_Y)
    }
  };
};

// Создает набор объявлений - mocks?
var createAdverts = function (length) {
  for (var i = 0; i < length; i++) {
    adverts.push(getAdvert());
  }
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Отрисовывает метку на карте
var renderMapPin = function (item) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = item.author.avatar;
  mapPinElement.querySelector('img').alt = item.offer.title;
  mapPinElement.style = 'left:' + ' ' + (item.location.x - offsetX) + 'px; top:' + ' ' + (item.location.y - offsetY) + 'px';
  return mapPinElement;
};

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderMapCard = function (card) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[card.offer.type];
  mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
  mapCardElement.querySelector('.popup__features').querySelectorAll('.popup__feature').textContent = card.offer.features;
  mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;
  mapCardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = card.offer.photos;
  // var cardPhotos = mapCardElement.querySelector('.popup__photos').src;
  // if (card.offer.photos.length) {
  //   for (var i = 1; i > card.offer.photos.length; i++) {
  //     var cardPhoto = document.createElement('img');
  //     cardPhoto.classList.add('.popup__photo');
  //     cardPhotos.appendChild(cardPhoto);
  //   }
  // } else {
  //   mapCardElement.remove(cardPhotos);
  // }

  return mapCardElement;
};

// Отрисовывает массив меток
var renderMapPins = function (length) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  createAdverts(length);
  for (var i = 0; i < length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
    fragment.appendChild(renderMapCard(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

renderMapPins(MAX_AMOUNT);
