'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelector('#housing-features');
  // var housingFeatures = formFilters.querySelectorAll('.map__checkbox');
  // var housingFeatures = Array.from(formFilters.querySelectorAll('.map__checkbox'));

  // Значение фильтра по умолчанию
  var defaultFilter = 'any';
  var adverts = [];
  var filteredAdverts = [];

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  // var ADVERT_FEATURES = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];

  var onFilterChange = function (event) {
    filteredAdverts = adverts;
    switch (true) {
      case event.target.id === housingType.id:
        filteredAdverts = filterByHouseType(event.target.value);
        break;
      case event.target.id === housingPrice.id:
        filteredAdverts = filterByPrice(event.target.value);
        break;
      case event.target.id === housingRooms.id:
        filteredAdverts = filterByRooms(event.target.value);
        break;
      case event.target.id === housingGuests.id:
        filteredAdverts = filterByGuests(event.target.value);
        break;
      case event.target.id === ('filter-' + event.target.value):
        return Array.from(formFilters.querySelectorAll('input:checked')).map(function (advert) {
          filteredAdverts = filterByFeatures(advert.value);
        });
      default:
        return true;
    }
    window.pin.removePins();
    window.pin.renderMapPins(filteredAdverts);
    return false;
  };

  var filterByHouseType = function (type) {
    if (type !== defaultFilter) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.type === type;
      });
    }
    return false;
  };

  var filterByPrice = function () {
    return filteredAdverts.filter(function (advert) {
      switch (true) {
        case 'low':
          return (advert.offer.price < MIN_PRICE);
        case 'middle':
          return (advert.offer.price <= MAX_PRICE && advert.offer.price >= MIN_PRICE);
        case 'high':
          return (advert.offer.price >= MAX_PRICE);
        default:
          return false;
      }
    });
  };

  var filterByRooms = function (rooms) {
    if (rooms !== defaultFilter) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.rooms === rooms;
      });
    }
    return false;
  };

  var filterByGuests = function (guests) {
    if (guests !== defaultFilter) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.guests === guests;
      });
    }
    return false;
  };

  var filterByFeatures = function (features) {
    for (var featureIndex = 0; featureIndex < housingFeatures.length; featureIndex++) {
      filteredAdverts = filteredAdverts.filter(filterByFeatures(housingFeatures[featureIndex]));
    }
    if (features !== defaultFilter) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.features === features;
      });
    }
    return false;
  };

  // var housingFeatures = Array.from(formFilters.querySelectorAll('.map__checkbox'));
  //
  // var filterByFeatures = function (advert) {
  //   var checkedFeatures = housingFeatures.filter(function (feature) {
  //     return feature.checked;
  //   });
  //   var isFeatureChecked = true;
  //   checkedFeatures.forEach(function (feature) {
  //     isFeatureChecked = isFeatureChecked && advert.offer.features.includes(feature.getAttribute('value'));
  //   });
  //   return isFeatureChecked;
  // };

  var renderAdverts = function (data) {
    adverts = data;
    window.pin.renderMapPins(adverts.slice(0, window.pin.MAX_AMOUNT));
  };

  // var getAdverts = function () {
  //   return adverts;
  // };
  //
  // var filteredAdverts = getAdverts();

  // var getFilteredAdverts = function () {
  //   console.log(filteredAdverts)
  //   filteredAdverts
  //     .filter(filterByHouseType)
  //     .filter(filterByPrice)
  //     .filter(filterByRooms)
  //     .filter(filterByGuests)
  //     .filter(filterByFeatures);
  //   console.log(filteredAdverts);
  // return filteredAdverts;
  // };
  //
  // var updateAdverts = function () {
  //   window.card.removeMapCard();
  //   window.pin.removePins();
  //   window.pin.renderMapPins(getFilteredAdverts);
  // };

  // formFilters.addEventListener('change', window.util.debounce(getFilteredAdverts));
  // formFilters.addEventListener('change', onFilterChange);
  // formFilters.removeEventListener('change', onFilterChange);

  window.filter = {
    onFilterChange: onFilterChange,
    renderAdverts: renderAdverts
  };
})();
