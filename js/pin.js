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
  var adForm = document.querySelector('.ad-form');
  // var address = document.querySelector('#address');
  var MAX_AMOUNT = 5;

  // Отрисовывает метку на карте
  var renderMapPin = function (item) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style = 'left:' + ' ' + (item.location.x - offsetX) + 'px; top:' + ' ' + (item.location.y - offsetY) + 'px';
    return mapPinElement;
  };

  // Отрисовывает массив меток
  var renderMapPins = function (array) {
    var mapPins = document.querySelector('.map__pins');
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderMapPin(array[i]));
      if (i === 0) {
        map.insertBefore(window.card.renderMapCard(array[0]), mapFiltersContainer);
      }
      mapPins.appendChild(fragment);
    }
  };

  renderMapPins(MAX_AMOUNT);

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

    // var dragged = false;

    var onMouseMove = function (moveEvent) {
      // moveEvent.preventDefault();
      // dragged = true;

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
      // upEvent.preventDefault();
      setCoordinates(
          PinMain.HEIGHT / 2,
          PinMain.WIDTH / 2
      );
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // if (dragged) {
      //   var onClickPreventDefault = function (clickEvent) {
      //     clickEvent.preventDefault();
      //     mapPinMain.addEventListener('click', onClickPreventDefault);
      //   };
      //   mapPinMain.addEventListener('click', onClickPreventDefault);
      // }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // var onMapPinClick = function (event) {
  //   if (event.target.closest('.map__pin') && !event.target.closest('.map__pin--main')) {
  //     var target = event.target.closest('.map__pin');
  //     var mapPins = document.querySelectorAll('.map__pin');
  //     if (!target.classList.contains('map__pin--active')) {
  //       Array.from(mapPins).map(function (pin) {
  //         if (pin.classList.contains('map__pin--active')) {
  //           pin.classList.remove('map__pin--active');
  //         }
  //       });
  //       target.classList.add('map__pin--active');
  //     }
  //     if (map.querySelector('.map__card')) {
  //       var mapCard = map.querySelector('.map__card');
  //       map.removeChild(mapCard);
  //     }
  //   }
  // };
  //
  // map.addEventListener('click', onMapPinClick);

  window.pin = {
    setCoordinates: setCoordinates,
    renderMapPins: renderMapPins,
    MAX_AMOUNT: MAX_AMOUNT,
    PinMain: PinMain
  };

})();
