'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelector('#housing-features');

  // Значение фильтра по умолчанию
  var defaultFilter = 'any';
  var adverts = [];

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var ADVERT_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var renderAdverts = function (data) {
    window.pin.renderMapPins(data);
    adverts = data;
  };

  var onFilterChange = function (event) {
    switch (event.target.value) {
      case event.target.id === housingType.id:
        return event.target.value;
      case event.target.id === housingPrice.id:
        return event.target.value;
      case event.target.id === housingRooms.id:
        return event.target.value;
      case event.target.id === housingGuests.id:
        return event.target.value;
      case event.target.id === ('filter-' + event.target.value):
        return Array.from(formFilters.querySelectorAll('input:checked')).map(function (advert) {
          return advert.value;
        });
      default:
        return true;
    }
  };

  var filterByHouseType = function (advert) {
    return housingType.value === defaultFilter ? true : housingType.value === advert.offer.type;
  };

  var filterByPrice = function (advert, element) {
    switch (element.value) {
      case 'low':
        return (advert.offer.price < MIN_PRICE);
      case 'middle':
        return (advert.offer.price <= MAX_PRICE && advert.offer.price >= MIN_PRICE);
      case 'high':
        return (advert.offer.price >= MAX_PRICE);
      default:
        return true;
    }
  };

  var filterByFeatures = function (key, item) {
    for (var featureIndex = 0; featureIndex < ADVERT_FEATURES.length; featureIndex++) {
      filteredAdverts = filteredAdverts.filter(filterByFeatures(ADVERT_FEATURES[featureIndex]));
    }
    return housingFeatures.value === defaultFilter ? true : housingFeatures.value === item.offer[key].toString();
  };

  var filterByRoomsNumber = function () {

  };

  var filterByGuestsNumber = function () {

  };

  var getAdverts = function () {
    return adverts;
  };
  var filteredAdverts = getAdverts();

  var getFilteredAdverts = function () {
    filteredAdverts
      .filter(filterByHouseType)
      .filter(filterByPrice)
      .filter(filterByRoomsNumber)
      .filter(filterByGuestsNumber)
      .filter(filterByFeatures);

    return filteredAdverts;
  };

  formFilters.addEventListener('change', window.util.debounce(getFilteredAdverts));

})();
