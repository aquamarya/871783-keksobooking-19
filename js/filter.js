'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');

  // Значение фильтра по умолчанию
  var defaultFilter = 'any';
  var adverts = [];
  var filteredAdverts = [];

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

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
        var checked = [];
        var features = Array.from(document.getElementsByName('features'));
        features.forEach(function (feature) {
          if (feature.checked) {
            checked.push(feature.value);
          }
        });
        filteredAdverts = filterByFeatures(checked);
        break;

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
        case advert.offer.price < MIN_PRICE:
          return advert;
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
        return advert.offer.rooms === parseInt(rooms, 10);
      });
    }
    return false;
  };

  var filterByGuests = function (guests) {
    if (guests !== defaultFilter) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.guests === parseInt(guests, 10);
      });
    }
    return false;
  };

  var filterByFeatures = function (features) {
    return filteredAdverts.filter(function (advert) {
      return features.every(function (feature) {
        return (advert.offer.features.indexOf(feature) > -1);
      });
    });
  };

  var renderAdverts = function (data) {
    adverts = data;
    window.pin.renderMapPins(adverts.slice(0, window.pin.MAX_AMOUNT));
  };

  formFilters.addEventListener('change', window.util.debounce(onFilterChange));

  window.filter = {
    onFilterChange: onFilterChange,
    renderAdverts: renderAdverts
  };

})();
