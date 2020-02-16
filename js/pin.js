'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  // var address = document.querySelector('#address');

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

  setCoordinates(
      window.data.PinMain.WIDTH / 2,
      window.data.PinMain.HEIGHT / 2
  );

  // Ограничивает перемещение метки по горизонтали
  // var setMinMaxX = function () {
  //   if (parseInt(mapPinMain.style.left + window.data.Pin / 2, 10) >= window.data.MAX_X) {
  //     mapPinMain.style.left = (window.data.MAX_X - window.data.Pin / 2) + 'px';
  //   } else if (parseInt(mapPinMain.style.left + window.data.Pin / 2, 10) <= 0) {
  //     mapPinMain.style.left = (0 - window.data.Pin / 2) + 'px';
  //   }
  // };

  // Ограничивает перемещение метки по вертикали
  // var setMinMaxY = function () {
  //   if (mapPinMain.style.top > window.data.MAX_Y) {
  //     mapPinMain.style.top = window.data.MAX_Y + 'px';
  //   } else if (parseInt(mapPinMain.style.top, 10) < 0) {
  //     mapPinMain.style.top = window.data.MIN_Y + 'px';
  //   }
  // };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // var dragged = false;

    var onMouseMove = function (moveEvt) {
      // moveEvt.preventDefault();
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // var top = mapPinMain.offsetTop - shift.y;
      // var left = mapPinMain.offsetTop - shift.x;
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (parseInt(mapPinMain.style.left, 10) + window.data.PinMain.WIDTH / 2 >= window.data.MAX_X) {
        mapPinMain.style.left = (window.data.MAX_X - window.data.PinMain.WIDTH / 2) + 'px';
      } else if (parseInt(mapPinMain.style.left, 10) + window.data.PinMain.WIDTH / 2 <= 0) {
        mapPinMain.style.left = (0 - window.data.PinMain.WIDTH / 2) + 'px';
      }

      if (parseInt(mapPinMain.style.top, 10) > window.data.MAX_Y) {
        mapPinMain.style.top = window.data.MAX_Y + 'px';
      } else if (parseInt(mapPinMain.style.top, 10) < window.data.MIN_Y) {
        mapPinMain.style.top = window.data.MIN_Y + 'px';
      }
      //
      // mapPinMain.style.top = setMinMaxY(top) + 'px';
      // mapPinMain.style.left = setMinMaxX(left) + 'px';
      //
      // console.log(address.value);
      // address.value = setCoordinates(
      //     window.data.PinMain.HEIGHT / 2,
      //     window.data.PinMain.WIDTH / 2
      // );

    };

    var onMouseUp = function () {
      // upEvt.preventDefault();
      // console.log(address.value);
      // address.value = setCoordinates();
      // address.value = setCoordinates(
      //     // console.log(xCorrection),
      //   window.data.PinMain.HEIGHT / 2, 10)),
      //     (parseInt(window.data.PinMain.WIDTH / 2, 10))
      // );
      setCoordinates(
          window.data.PinMain.HEIGHT / 2,
          window.data.PinMain.WIDTH / 2
      );
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // if (dragged) {
      //   var onClickPreventDefault = function (clickEvt) {
      //     clickEvt.preventDefault();
      //     mapPinMain.addEventListener('click', onClickPreventDefault);
      //   };
      //   mapPinMain.addEventListener('click', onClickPreventDefault);
      // }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    setCoordinates: setCoordinates
  };

})();
