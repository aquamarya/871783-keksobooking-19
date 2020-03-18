'use strict';

(function () {
  var PinMain = {
    X: 570,
    Y: 375,
    HEIGHT: 65,
    WIDTH: 65
  };
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var Pin = {
    width: 50,
    height: 70
  };
  var offsetX = Pin.width / 2;
  var offsetY = Pin.height / 2;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var allPins = document.getElementsByClassName('map__pin');
  var adForm = document.querySelector('.ad-form');
  var MAX_AMOUNT = 5;
  var ads = [];

  // Отрисовывает метку на карте
  var renderMapPin = function (item) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style = 'left:' + ' ' + (item.location.x - offsetX) + 'px; top:' + ' ' + (item.location.y - offsetY) + 'px';

    mapPinElement.addEventListener('keydown', mapPinElementKeydown);
    function mapPinElementKeydown(event) {
      if (event.key === 'Enter' && !mapPinElement.classList.contains('map__pin--active')) {
        var items = Array.from(document.querySelectorAll('.map__pin'));
        for (item in items) {
          if (!item === mapPinElement) {
            item.classList.remove('map__pin--active');
          }
        }
        window.card.showMapCard(item);
        mapPinElement.classList.add('map__pin--active');
      }
    }

    mapPinElement.addEventListener('mousedown', mapPinElementMousedown);
    function mapPinElementMousedown(event) {
      if (event.button === 0 && !mapPinElement.classList.contains('map__pin--active')) {
        var items = Array.from(document.querySelectorAll('.map__pin'));
        items.forEach(function (i, index) {
          if (i !== mapPinElement) {
            i.classList.remove('map__pin--active');
          } else {
            window.card.showMapCard(index, ads);
          }
        });
        mapPinElement.classList.add('map__pin--active');
      }
    }

    return mapPinElement;
  };

  // Отрисовывает массив меток
  var renderMapPins = function (adverts) {
    ads = adverts;
    if (ads.length > MAX_AMOUNT) {
      ads = ads.slice(0, MAX_AMOUNT);
    }

    var fragment = document.createDocumentFragment();
    removePins();
    ads.forEach(function (advert) {
      if (advert.offer) {
        fragment.appendChild(renderMapPin(advert));
      }
    });
    mapPins.appendChild(fragment);
  };

  // Удаляет старые метки
  function removePins() {
    Array.from(allPins).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  }

  // Устанавливает координаты метки в поля ввода адреса
  var setCoordinates = function (xCorrection, yCorrection) {
    var x = parseInt(mapPinMain.style.left, 10);
    var y = parseInt(mapPinMain.style.top, 10);
    x += xCorrection;
    y += yCorrection;
    adForm.querySelector('#address').value = Math.round(x) + ', ' + Math.round(y);
  };

  setCoordinates(
      PinMain.WIDTH / 2,
      PinMain.HEIGHT / 2
  );

  mapPinMain.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (parseInt(mapPinMain.style.left, 10) + PinMain.WIDTH / 2 >= MAX_X) {
        mapPinMain.style.left = (MAX_X - PinMain.WIDTH / 2) + 'px';
      } else if (parseInt(mapPinMain.style.left, 10) + PinMain.WIDTH / 2 <= 0) {
        mapPinMain.style.left = (0 - PinMain.WIDTH / 2) + 'px';
      }

      if (parseInt(mapPinMain.style.top, 10) > MAX_Y) {
        mapPinMain.style.top = MAX_Y + 'px';
      } else if (parseInt(mapPinMain.style.top, 10) < MIN_Y) {
        mapPinMain.style.top = MIN_Y + 'px';
      }

    };

    var onMouseUp = function () {
      setCoordinates(
          PinMain.HEIGHT / 2,
          PinMain.WIDTH / 2
      );

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    setCoordinates: setCoordinates,
    renderMapPins: renderMapPins,
    MAX_AMOUNT: MAX_AMOUNT,
    PinMain: PinMain,
    removePins: removePins
  };

})();
