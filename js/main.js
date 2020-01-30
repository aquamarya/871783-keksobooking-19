'use strict';

var PRISES = [
  5000,
  10000
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

var getRandomItem = function (array) {
  return Math.floor(Math.random() * array.length);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
