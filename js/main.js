'use strict';

var PRICES = [
  '10000',
  '50000'
];
var TYPE_OF_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
// var TYPE_OF_HOUSE_CARD = {
//   'palace': 'Дворец',
//   'flat': 'Квартира',
//   'house': 'Дом',
//   'bungalo': 'Бунгало'
// };
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
var PHOTOS = [
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
var PIN_MAIN = {
  x: 570,
  y: 375,
  height: 65,
  width: 65,
};
var PIN_MAIN_OFFSET_X = PIN_MAIN.width / 2;
var PIN_MAIN_OFFSET_Y = PIN_MAIN.height / 2;
var PIN_MAIN_SIZE = 65;
var FORM_ELEMENTS = [
  '.ad-form fieldset',
  '.map__filters select',
  '.map__filters fieldset'
];

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
      type: getRandomItem(TYPE_OF_HOUSE),
      rooms: getRandomIntInclusive(ROOMS[0], ROOMS[1]),
      guests: getRandomIntInclusive(GUESTS[0], GUESTS[1]),
      checkin: getRandomItem(CHECKIN),
      checkout: getRandomItem(CHECKOUT),
      features: [getRandomItem(FEATURES), getRandomItem(FEATURES)],
      description: 'Описание',
      photos: [getRandomItem(PHOTOS), getRandomItem(PHOTOS)]
    },
    location: {
      x: getRandomIntInclusive(MIN_X, MAX_X),
      y: getRandomIntInclusive(MIN_Y, MAX_Y)
    }
  };
};

// Создает набор объявлений
var createAdverts = function (length) {
  for (var i = 0; i < length; i++) {
    adverts.push(getAdvert());
  }
};

var map = document.querySelector('.map');
// var mapFiltersContainer = map.querySelector('.map__filters-container');

// Отрисовывает метку на карте
var renderMapPin = function (item) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = item.author.avatar;
  mapPinElement.querySelector('img').alt = item.offer.title;
  mapPinElement.style = 'left:' + ' ' + (item.location.x - offsetX) + 'px; top:' + ' ' + (item.location.y - offsetY) + 'px';
  return mapPinElement;
};

// var renderMapCard = function (card) {
//   var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
//   var mapCardElement = mapCardTemplate.cloneNode(true);
//   var popupFeatures = mapCardElement.querySelector('.popup__features');
//   var popupFeatureTemplate = Array.from(popupFeatures.childNodes);
//   var features = card.offer.features;
//
//   mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
//   mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + '₽/ночь';
//   mapCardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE_CARD[card.offer.type];
//   mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + 'комнаты для' + ' ' + card.offer.guests + ' ' + 'гостей';
//   mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + card.offer.checkin + ', выезд до' + ' ' + card.offer.checkout;
//   mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
//   mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;
//
//   for (var i = 0; i < features.length; i++) {
//     popupFeatureTemplate.forEach(function (child) {
//       if (child.nodeType === 1) {
//         if (child.classList.contains('popup__feature--' + features[i])) {
//           child.style.display = 'inline-block';
//           child.classList.add('popup__feature--visible');
//         } else if (!child.classList.contains('popup__feature--visible')) {
//           child.style.display = 'none';
//         }
//       }
//     });
//   }
//
//   var cardPhotos = mapCardElement.querySelector('.popup__photos');
//   var cardPhoto = cardPhotos.querySelector('.popup__photo');
//   var cardPhotoClone = cardPhotos.querySelector('.popup__photo').cloneNode(true);
//   var photos = card.offer.photos;
//
//   for (var j = 0; j < photos.length; j++) {
//     if (j === 0) {
//       cardPhoto.src = photos[j];
//       cardPhotos.appendChild(cardPhoto);
//     } else {
//       cardPhotoClone.src = photos[j];
//       cardPhotos.appendChild(cardPhotoClone);
//     }
//   }
//   // return mapCardElement;
// };

// Отрисовывает массив меток
var renderMapPins = function (length) {
  var mapPins = document.querySelector('.map__pins');
  // var map = document.querySelector('.map');
  // var mapFiltersContainer = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  createAdverts(length);
  for (var i = 0; i < length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
    // if (i === 0) {
    //   map.insertBefore(renderMapCard(adverts[0]), mapFiltersContainer);
    // }
  }
  mapPins.appendChild(fragment);
};

renderMapPins(MAX_AMOUNT);

// Включает\отключает элементы формы
var setDisableToggle = function (data, toggle) {
  for (var i = 0; i < data.length; i++) {
    var selectors = document.querySelectorAll(data[i]);
    for (var j = 0; j < selectors.length; j++) {
      if (toggle === 'add') {
        selectors[j].setAttribute('disabled', 'disabled');
      } else {
        selectors[j].removeAttribute('disabled');
      }
    }
  }
};
// Отключает элементы формы
setDisableToggle(FORM_ELEMENTS, 'add');

var form = document.querySelector('.ad-form');
var mapPinMain = map.querySelector('.map__pin--main');

var activatedForm = function () {
  setDisableToggle(FORM_ELEMENTS, 'remove');
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  setCoordinates(mapPinMain.style.left, mapPinMain.style.top, PIN_MAIN_SIZE / 2, PIN_MAIN.height);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatedForm();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatedForm();
  }
});

// Устанавливает координаты метки в поля ввода адреса
var setCoordinates = function () {
  PIN_MAIN.x = parseInt(PIN_MAIN.x, 10);
  PIN_MAIN.y = parseInt(PIN_MAIN.y, 10);
  PIN_MAIN.x += PIN_MAIN_OFFSET_X;
  PIN_MAIN.y += PIN_MAIN_OFFSET_Y;
  form.querySelector('#address').value = Math.round(PIN_MAIN.x) + ', ' + Math.round(PIN_MAIN.y);
};

setCoordinates(mapPinMain.style.left, mapPinMain.style.top, PIN_MAIN_SIZE / 2, PIN_MAIN_SIZE / 2);

// Устанавливат минимальное значение для поля цена
// var setPrice = function (index) {
//   document.querySelector('#price').setAttribute('min', PRICES[index]);
//   document.querySelector('#price').setAttribute('placeholder', PRICES[index]);
// };
//
// setPrice(document.querySelector('#type').options.selectedIndex);
// document.querySelector('#type').addEventListener('change', function () {
//   setPrice(document.querySelector('#type').options.selectedIndex);
// });

var typeOfHouse = form.querySelector('#type');

// Устанавливат минимальное значение для поля цена
var setPrice = function () {
  var pricePerNight = document.querySelector('#price');

  if (typeOfHouse === 'bungalo') {
    pricePerNight.setAttribute('min', '0');
    pricePerNight.setAttribute('placeholder', '0');
  } else if (typeOfHouse === 'flat') {
    pricePerNight.setAttribute('min', '1000');
    pricePerNight.setAttribute('placeholder', '1000');
  } else if (typeOfHouse === 'house') {
    pricePerNight.setAttribute('min', '5000');
    pricePerNight.setAttribute('placeholder', '5000');
  } else if (typeOfHouse === 'palace') {
    pricePerNight.setAttribute('min', '10000');
    pricePerNight.setAttribute('placeholder', '10000');
  }
};

setPrice();

// Контролирует соответствие количества гостей с количеством комнат
// var setGuests = function (rooms) {
//   var capacity = form.querySelector('#capacity option');
//   rooms = (parseInt(rooms, 10) === (roomNumber.value < capacity.value)) ? rooms = 0 : rooms = parseInt(rooms, 10);
//   for (var i = 0; i < capacity.length; i++) {
//
//     var currentItem = parseInt(capacity[i].value, 10);
//
//     capacity[i].removeAttribute('disabled');
//     capacity[i].removeAttribute('selected');
//
//     if (currentItem > rooms || currentItem === 0) {
//       capacity[i].setAttribute('disabled', 'disabled');
//     }
//
//     if (currentItem === rooms) {
//       capacity[i].removeAttribute('disabled');
//       capacity[i].setAttribute('selected', 'selected');
//     }
//   }
// };

var roomNumber = form.querySelector('#room_number');
// form.querySelector('#room_number').addEventListener('change', function () {
//   setGuests(form.querySelector('#room_number').value);
// });
//
// setGuests(form.querySelector('#room_number').value);

var capacity = form.querySelector('#capacity option');

var capacityValidate = function () {
  if (capacity.value === '0' && roomNumber.value !== '100') {
    capacity.setCustomValidity('Выберите количество гостей!');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Размещение гостей невозможно!');
  } else if (roomNumber.value < capacity.value) {
    capacity.setCustomValidity('Слишком много гостей!');
  } else {
    capacity.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', function (evt) {
  capacityValidate(evt);
});

capacity.addEventListener('change', function (evt) {
  capacityValidate(evt);
});

// var capacityValidate = function () {
//   if (capacity.value === '0') {
//     roomNumber.value = 100;
//   } else if (capacity.value === '1') {
//     roomNumber.value = 1;
//   } else if (capacity.value === '2') {
//     roomNumber.value = 2;
//   } else if (capacity.value === '3') {
//     roomNumber.value = 3;
//   } else {
//    capacity.setCustomValidity('');
//   }
// };

// form.addEventListener('change', function (evt) {
//   capacityValidate(evt);
// });

var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var timeInValidate = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};
var timeOutValidate = function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
};

timeIn.addEventListener('change', function (evt) {
  timeInValidate(evt);
});
timeOut.addEventListener('change', function (evt) {
  timeOutValidate(evt);
});
