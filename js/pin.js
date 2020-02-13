'use strict';

(function () {

  // var mapFiltersContainer = map.querySelector('.map__filters-container');

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
    var x = parseInt(window.data.mapPinMain.style.left, 10);
    var y = parseInt(window.data.mapPinMain.style.top, 10);
    x += xCorrection;
    y += yCorrection;
    window.form.form.querySelector('#address').value = Math.round(x) + ', ' + Math.round(y);
  };

  setCoordinates(window.data.PinMain.WIDTH / 2, window.data.PinMain.HEIGHT / 2);

  window.pin = {
    renderMapPin: renderMapPin,
    renderMapPins: renderMapPins,
    setCoordinates: setCoordinates
  };
})();
