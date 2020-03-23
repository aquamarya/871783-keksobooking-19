'use strict';

(function () {
  var HOUSING_PRICES = [
    0,
    1000,
    5000,
    10000
  ];
  var FORM_ELEMENTS = [
    '.ad-form fieldset',
    '.map__filters select',
    '.map__filters fieldset'
  ];
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var mapPinMain = map.querySelector('.map__pin--main');
  var btnReset = adForm.querySelector('.ad-form__reset');
  var formFilters = document.querySelector('.map__filters');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // Начальное местоположение главной метки
  var startMapPinMain = {
    centerX: Math.round(window.pin.PinMain.X + window.pin.PinMain.WIDTH / 2),
    centerY: Math.round(window.pin.PinMain.Y + window.pin.PinMain.HEIGHT / 2),
    pinMainY: Math.round(window.pin.PinMain.Y + window.pin.PinMain.HEIGHT / 2 + window.pin.PinMain.PEAK)
  };
  //
  // adFormAddress.setAttribute('value', startMapPinMain.centerX + ', ' + startMapPinMain.centerY);

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

  var onActivateForm = function (event) {
    if (event.button === 0) {
      activateForm();
    }
  };

  var onActivateFormEnt = function (event) {
    if (event.key === 'Enter') {
      activateForm();
    }
  };

  // Активирует форму
  var activateForm = function () {
    setDisableToggle(FORM_ELEMENTS, 'remove');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.setCoordinates(window.pin.PinMain.WIDTH / 2, window.pin.PinMain.HEIGHT + window.pin.PinMain.PEAK);
    window.api.load(function (result) {
      window.pin.renderMapPins(result);
      // window.filter.renderAdverts(result);
    }, window.api.onLoadError);
    formFilters.addEventListener('change', window.util.debounce(window.filter.onFilterChange));
    mapPinMain.removeEventListener('mousedown', onActivateForm);
    mapPinMain.removeEventListener('keydown', onActivateFormEnt);
  };

  // Деактивирует форму
  var deactivateForm = function () {
    adForm.reset();
    setDisableToggle(FORM_ELEMENTS, 'add');
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adFormAddress.setAttribute('value', startMapPinMain.centerX + ', ' + startMapPinMain.centerY);
    adFormAddress.value = startMapPinMain.centerX + ', ' + startMapPinMain.centerY;
    window.pin.removePins();
    window.card.removeMapCard();
    mapPinMain.addEventListener('mousedown', onActivateForm);
    mapPinMain.addEventListener('keydown', onActivateFormEnt);
  };

  deactivateForm();

  adForm.addEventListener('submit', function (event) {
    window.api.save(new FormData(adForm), function (response) {
      if (response) {
        window.api.onLoadSuccess();
        deactivateForm(true);
      } else {
        window.api.onLoadError();
      }
    }, window.api.onLoadError);
    event.preventDefault();
  });

  btnReset.addEventListener('click', function (event) {
    event.preventDefault();
    deactivateForm();
    adForm.reset();
  });

  // Устанавливат минимальное значение для поля "цена"
  var setPrice = function () {
    var typeOfHouse = adForm.querySelector('#type').options.selectedIndex;
    var pricePerNight = document.querySelector('#price');
    pricePerNight.setAttribute('min', HOUSING_PRICES[typeOfHouse]);
    pricePerNight.setAttribute('placeholder', HOUSING_PRICES[typeOfHouse]);
  };

  setPrice();

  document.querySelector('#type').addEventListener('change', function () {
    setPrice();
  });

  // Контролирует соответствие количества гостей с количеством комнат
  var setRoomsGuests = function (value) {
    var capacity = adForm.querySelectorAll('#capacity option');
    var rooms = value === '100' ? 0 : parseInt(value, 10);
    for (var i = 0; i < capacity.length; i++) {
      var currentOption = parseInt(capacity[i].value, 10);
      capacity[i].removeAttribute('disabled');
      if (currentOption > rooms || currentOption === 0) {
        capacity[i].setAttribute('disabled', 'disabled');
        if (parseFloat(adForm.querySelectorAll('#capacity')[0].value) > rooms) {
          adForm.querySelectorAll('#capacity')[0].value = rooms;
        }
      } else {
        capacity[i].removeAttribute('disabled');
      }
    }
  };

  adForm.querySelector('#room_number').addEventListener('change', function () {
    setRoomsGuests(adForm.querySelector('#room_number').value);
  });

  setRoomsGuests(adForm.querySelector('#room_number').value);

  var timeInValidate = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };

  var timeOutValidate = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };

  timeIn.addEventListener('change', function (event) {
    timeInValidate(event);
  });

  timeOut.addEventListener('change', function (event) {
    timeOutValidate(event);
  });

  window.adForm = {
    setDisableToggle: setDisableToggle,
    activateForm: activateForm,
    timeIn: timeIn,
    timeOut: timeOut,
    timeInValidate: timeInValidate,
    timeOutValidate: timeOutValidate,
  };

})();
