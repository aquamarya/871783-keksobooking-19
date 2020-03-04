'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = map.querySelector('.map__pin--main');
  var btnReset = adForm.querySelector('.ad-form__reset');

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
  setDisableToggle(window.data.FORM_ELEMENTS, 'add');

  var activatedForm = function () {
    setDisableToggle(window.data.FORM_ELEMENTS, 'remove');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.setCoordinates(window.data.PinMain.WIDTH / 2, window.data.PinMain.HEIGHT + window.data.PIN_MAIN_PEAK);
    window.api.load(window.pin.renderMapPins, window.api.onLoadError);
  };

  adForm.addEventListener('submit', function (event) {
    window.api.save(new FormData(adForm), window.api.onLoadSuccess, window.api.onLoadError);
    event.preventDefault();
  });

  btnReset.addEventListener('click', function (event) {
    event.preventDefault();
    adForm.reset();
  });

  mapPinMain.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
      activatedForm();
    }
  });

  mapPinMain.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      activatedForm();
    }
  });

  // Устанавливат минимальное значение для поля цена
  var setPrice = function () {
    var typeOfHouse = adForm.querySelector('#type').options.selectedIndex;
    var pricePerNight = document.querySelector('#price');
    pricePerNight.setAttribute('min', window.data.HOUSING_PRICES[typeOfHouse]);
    pricePerNight.setAttribute('placeholder', window.data.HOUSING_PRICES[typeOfHouse]);
  };

  setPrice();

  document.querySelector('#type').addEventListener('change', function () {
    setPrice();
  });

  // Контролирует соответствие количества гостей с количеством комнат
  var setGuests = function (value) {
    var capacity = adForm.querySelectorAll('#capacity option');
    // console.log(rooms, capacity);
    for (var i = 0; i < capacity.length; i++) {
      var currentOption = parseInt(capacity[i].value, 10);
      var rooms = value === '100' ? 0 : parseInt(value, 10);
      capacity[i].removeAttribute('disabled');
      capacity[i].removeAttribute('selected');
      if (currentOption > rooms || currentOption === 0) {
        capacity[i].setAttribute('disabled', 'disabled');
      } if (currentOption === rooms) {
        capacity[i].removeAttribute('disabled');
        capacity[i].setAttribute('selected', 'selected');
      }
    }
  };

  // var roomNumber = form.querySelector('#room_number');
  adForm.querySelector('#room_number').addEventListener('change', function () {
    setGuests(adForm.querySelector('#room_number').value);
  });

  setGuests(adForm.querySelector('#room_number').value);

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
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
    activatedForm: activatedForm,
    setPrice: setPrice,
    setGuests: setGuests,
    timeIn: timeIn,
    timeOut: timeOut,
    timeInValidate: timeInValidate,
    timeOutValidate: timeOutValidate,
  };

})();
