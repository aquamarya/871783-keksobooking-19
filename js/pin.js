'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  // var MIN_X = 0 - window.data.Pin / 2;
  // var MAX_X = 1200 - window.data.Pin / 2;

  // Отрисовывает метку на карте
  var renderMapPin = function (item) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style = 'left:' + ' ' + (item.location.x - window.data.offsetX) + 'px; top:' + ' ' + (item.location.y - window.data.offsetY) + 'px';
    return mapPinElement;
  };

  // Отрисовывает массив меток
  var renderMapPins = function (length) {
    var mapPins = document.querySelector('.map__pins');
    // var map = document.querySelector('.map');
    // var mapFiltersContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    window.data.createAdverts(length);
    for (var i = 0; i < length; i++) {
      fragment.appendChild(renderMapPin(window.data.adverts[i]));
      // if (i === 0) {
      //   map.insertBefore(renderMapCard(window.data.adverts[0]), mapFiltersContainer);
      // }
    }
    mapPins.appendChild(fragment);
  };

  renderMapPins(window.data.MAX_AMOUNT);

  // Устанавливает координаты метки в поля ввода адреса
  var setCoordinates = function (xCorrection, yCorrection) {
    var x = parseInt(mapPinMain.style.left, 10);
    var y = parseInt(mapPinMain.style.top, 10);
    x += xCorrection;
    y += yCorrection;
    form.querySelector('#address').value = Math.round(x) + ', ' + Math.round(y);
  };

  setCoordinates(window.data.PinMain.WIDTH / 2, window.data.PinMain.HEIGHT / 2);

  // Ограничивает перемещение метки по горизонтали
  // var setMinMaxX = function (left) {
  //   if (left < MIN_X) {
  //     return MIN_X;
  //   } else if (left < MAX_X) {
  //     return MAX_X;
  //   } else {
  //     return left;
  //   }
  // };

  // Ограничивает перемещение метки по вертикали
  // var setMinMaxY = function (top) {
  //   if (top < window.data.MIN_Y) {
  //     return window.data.MIN_Y;
  //   } else if (top < window.data.MAX_Y) {
  //     return window.data.MAX_Y;
  //   } else {
  //     return top;
  //   }
  // };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      // mapPinMain.style.top = setMinMaxY(top) + 'px';
      // mapPinMain.style.left = setMinMaxX(left) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.addEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    setCoordinates: setCoordinates
  };

})();
