'use strict';

(function () {
  // Создает случайный элемент массива
  var getRandomItem = function (array) {
    var itemIndex = Math.floor(Math.random() * array.length);
    return array[itemIndex];
  };

  // Возвращает результат, включая максимум и минимум
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Устраняет дребезг
  var DEBOUNCE_INTERVAL = 700; // ms

  var lastTimeout;
  console.log(debounce);
  var debounce = function (cb) {
    console.log(cb);
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRandomItem: getRandomItem,
    getRandomIntInclusive: getRandomIntInclusive,
    debounce: debounce
  };
})();
