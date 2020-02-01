'use strict';

var PRISES = [
  10000,
  50000
];
var TYPE_OF_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var ROOMS = [
  1,
  2,
  3
];
var GUESTS = [
  1,
  2,
  3
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
var pin = {
  width: 50,
  height: 60
};
var offsetX = pin.width / 2;
var offsetY = pin.height / 2;

// Создает случайный элемент массива
var getRandomItem = function (length) {
  return Math.floor(Math.random() * length);
};

// Возвращает результат, включая максимум и минимум
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var adverts = [];

// Создает объявление из массива данных
var advert = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок предложения',
      address: '600, 350', // "{{location.x}}, {{location.y}}"
      price: getRandomIntInclusive(PRISES),
      type: getRandomItem(TYPE_OF_HOUSE),
      rooms: getRandomIntInclusive(ROOMS),
      guests: getRandomIntInclusive(GUESTS),
      checkin: getRandomItem(CHECKIN),
      checkout: getRandomItem(CHECKOUT),
      features: getRandomItem(FEATURES),
      description: 'Описание',
      photos: getRandomItem(FOTOS)
    },
    location: {
      x: getRandomIntInclusive(0, 1200),
      y: getRandomIntInclusive(130, 630)
    }
  };
};

// Создает набор объявлений - mocks?
var createAdverts = function (length) {
  for (var i = 0; i < length; i++) {
    adverts.push(advert());
  }
};
createAdverts(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// var mapPins = document.querySelector('.map__pins'); закомментировала, т.к. тревис ругается
// пока не поняла, где это дальше применить - при отрисовке массива меток?
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовывает метку на карте
var renderMapPin = function () {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = advert.author.avatar; // в консоли почему-то этот путь помечает ошибкой
  mapPinElement.querySelector('img').alt = advert.offer.title;
  mapPinElement.style = 'left:' + ' ' + (advert.location.x - offsetX) + 'px; top:' + ' ' + (advert.location.y - offsetY) + 'px';
  return mapPinElement;
};

renderMapPin();

// Отрисовывает массив меток
var renderMapPins = function (length) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
  }
};

renderMapPins();
