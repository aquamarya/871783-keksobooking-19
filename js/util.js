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

  window.util = {
    getRandomItem: getRandomItem,
    getRandomIntInclusive: getRandomIntInclusive
  };
})();
