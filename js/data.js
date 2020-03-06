'use strict';

(function () {
  // var PRICES = [
  //   '10000',
  //   '50000'
  // ];
  // var TYPE_OF_HOUSE = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];
  // var TYPE_OF_HOUSE_CARD = {
  //   'palace': 'Дворец',
  //   'flat': 'Квартира',
  //   'house': 'Дом',
  //   'bungalo': 'Бунгало'
  // };
  // var ROOMS = [
  //   1,
  //   3
  // ];
  // var GUESTS = [
  //   1,
  //   2
  // ];
  // var CHECKIN = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var CHECKOUT = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var FEATURES = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];
  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];
  var HOUSING_PRICES = [
    0,
    1000,
    5000,
    10000
  ];
  // var Pin = {
  //   width: 50,
  //   height: 70
  // };
  // var MIN_X = 0;
  // var MAX_X = 1200;
  // var MIN_Y = 130;
  // var MAX_Y = 630;
  // var offsetX = Pin.width / 2;
  // var offsetY = Pin.height / 2;
  // var MAX_AMOUNT = 5;
  // var PinMain = {
  //   X: 570,
  //   Y: 375,
  //   HEIGHT: 65,
  //   WIDTH: 65
  // };
  // var PIN_MAIN_PEAK = 20;
  // var FORM_ELEMENTS = [
  //   '.ad-form fieldset',
  //   '.map__filters select',
  //   '.map__filters fieldset'
  // ];

  // var adverts = [];

  // Создает объявление из массива данных
  // var getAdvert = function () {
  //   return {
  //     author: {
  //       avatar: 'img/avatars/user0' + window.util.getRandomIntInclusive(1, MAX_AMOUNT) + '.png',
  //     },
  //     offer: {
  //       title: 'Заголовок предложения',
  //       address: '600, 350', // "{{location.x}}, {{location.y}}"
  //       price: window.util.getRandomIntInclusive(PRICES[0], PRICES[1]),
  //       type: window.util.getRandomItem(TYPE_OF_HOUSE),
  //       rooms: window.util.getRandomIntInclusive(ROOMS[0], ROOMS[1]),
  //       guests: window.util.getRandomIntInclusive(GUESTS[0], GUESTS[1]),
  //       checkin: window.util.getRandomItem(CHECKIN),
  //       checkout: window.util.getRandomItem(CHECKOUT),
  //       features: [window.util.getRandomItem(FEATURES), window.util.getRandomItem(FEATURES)],
  //       description: 'Описание',
  //       photos: [window.util.getRandomItem(PHOTOS), window.util.getRandomItem(PHOTOS)]
  //     },
  //     location: {
  //       x: window.util.getRandomIntInclusive(MIN_X, MAX_X),
  //       y: window.util.getRandomIntInclusive(MIN_Y, MAX_Y)
  //     }
  //   };
  // };
  //
  // // Создает набор объявлений
  // var createAdverts = function (length) {
  //   for (var i = 0; i < length; i++) {
  //     adverts.push(getAdvert());
  //   }
  // };

  window.data = {
    // Pin: Pin,
    // MAX_X: MAX_X,
    // MIN_Y: MIN_Y,
    // MAX_Y: MAX_Y,
    // TYPE_OF_HOUSE_CARD: TYPE_OF_HOUSE_CARD,
    HOUSING_PRICES: HOUSING_PRICES,
    // offsetX: offsetX,
    // offsetY: offsetY,
    // MAX_AMOUNT: MAX_AMOUNT,
    // PinMain: PinMain,
    // PIN_MAIN_PEAK: PIN_MAIN_PEAK,
    // FORM_ELEMENTS: FORM_ELEMENTS
    // adverts: adverts,
    // createAdverts: createAdverts
  };

})();
