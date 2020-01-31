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
  offsetX: 50,
  offsetY: 60
};
var LOCATION_X = 60;
var LOCATION_Y = 300;

var offsetX = ;
var offsetY = ;

var getRandomItem = function (length) {
  return Math.floor(Math.random() * length);
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var createAdverts = function (length) {
  var adverts = [];
  for (var i = 0; i < length; i++) {
    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomArbitrary(1, 8) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350', // "{{location.x}}, {{location.y}}"
        price: getRandomArbitrary(PRISES),
        type: getRandomItem(TYPE_OF_HOUSE),
        rooms: getRandomArbitrary(ROOMS),
        guests: getRandomArbitrary(GUESTS),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: getRandomItem(FEATURES),
        description: 'Описание',
        photos: getRandomItem(FOTOS)
      },
      location: {
        x: getRandomArbitrary(0, 1200),
        y: getRandomArbitrary(130, 630)
      }
    };
    return adverts;
  }
};
createAdverts();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderMapPin = function (adverts) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = adverts.author.avatar;
  mapPinElement.querySelector('img').alt = adverts.offer.title;
  mapPinElement.style = 'left:' + ' ' + (adverts.location.x + offsetX) + 'px; top:' + ' ' + (adverts.location.y + offsetY) + 'px';
  return mapPinElement;
};

renderMapPin();

var renderPins = function (length) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
  }
};

renderPins();
