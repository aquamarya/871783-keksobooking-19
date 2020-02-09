'use strict';

// var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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
  left: 570,
  top: 375,
  offsetX: 32,
  offsetY: 32
};

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

// Создает набор объявлений - mocks?
var createAdverts = function (length) {
  for (var i = 0; i < length; i++) {
    adverts.push(getAdvert());
  }
};

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');

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

var form = document.querySelector('.ad-form');

var formFieldsets = form.querySelectorAll('fieldset');
formFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});

var formAddress = form.querySelector('#address');
formAddress.setAttribute('readonly', 'readonly');
formAddress.value = (PIN_MAIN.left + PIN_MAIN.offsetX) + ', ' + (PIN_MAIN.top + PIN_MAIN.offsetY);

var mapFilterSelects = mapFiltersContainer.querySelectorAll('.map__filters select');
mapFilterSelects.forEach(function (select) {
  select.setAttribute('disabled', 'disabled');
});

var mapFilterFieldsets = mapFiltersContainer.querySelectorAll('.map__filters fieldset');
mapFilterFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});

var activatedPage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach(function (fieldset) {
    fieldset.removeAttribute('disabled');
  });
  mapFilterSelects.forEach(function (select) {
    select.removeAttribute('disabled');
  });
  mapFilterFieldsets.forEach(function (fieldset) {
    fieldset.removeAttribute('disabled');
  });
};

var mapPinMain = map.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatedPage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatedPage();
  }
});

var roomNumber = form.querySelector('select #room_number');
var capacity = form.querySelector('select #capacity');

var checkValidity = function () {
  if (capacity.value === '0' && roomNumber.value !== '100') {
    capacity.setCustomValidity('Выберите количество гостей!');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Размещение гостей невозможно!');
  } else if (roomNumber.value < capacity.value) {
    capacity.setCustomValidity('Слишком много гостей!');
  } else {
    capacity.setCustomValidity();
  }
};

form.addEventListener('change', function () {
  checkValidity();
});
