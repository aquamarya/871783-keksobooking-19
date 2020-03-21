'use strict';

(function () {

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');

  // Значение фильтра по умолчанию
  var defaultFilter = 'any';
  var adverts = [];
  var filteredAdverts = [];

  var onFilterChange = function () {
    filteredAdverts = adverts;

    var filters = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      features: Array.from(document.getElementsByName('features')).filter(function (feature) {
        return feature.checked;
      }).map(function (feature) {
        return feature.value;
      })
    };

    var keys = Object.keys(filters);
    keys.forEach(function (key) {
      var value = filters[key];
      switch (key) {
        case 'type':
          filteredAdverts = (value !== 'any') ? filterByHouseType(value) : filteredAdverts;
          break;
        case 'price':
          filteredAdverts = (value !== 'any') ? filterByPrice(value) : filteredAdverts;
          break;
        case 'rooms':
          filteredAdverts = (value !== 'any') ? filterByRooms(value) : filteredAdverts;
          break;
        case 'guests':
          filteredAdverts = (value !== 'any') ? filterByGuests(value) : filteredAdverts;
          break;
        case 'features':
          filteredAdverts = (value.length > 0) ? filterByFeatures(value) : filteredAdverts;
          break;

        default:
          return true;
      }
      return true;
    });

    window.card.removeMapCard();
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

  var filterByPrice = function (value) {
    return filteredAdverts.filter(function (advert) {
      switch (value) {
        case 'low':
          return advert.offer.price < MIN_PRICE;
        case 'middle':
          return advert.offer.price <= MAX_PRICE && advert.offer.price >= MIN_PRICE;
        case 'high':
          return advert.offer.price >= MAX_PRICE;
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

  // Сортирует пины по расстоянию от главной метки
  var sortByDistance = function (x, y, max) {
    var sortedPins = adverts.sort(function (first, second) {
      var firstSortedPin = Math.round(Math.sqrt(Math.pow(first.location.x - x, 2) + Math.pow(first.location.y - y, 2)));
      var secondSortedPin = Math.round(Math.sqrt(Math.pow(second.location.x - x, 2) + Math.pow(second.location.y - y, 2)));

      return firstSortedPin - secondSortedPin;
    });
    return (sortedPins.length > max) ? sortedPins.slice(0, max) : sortedPins;
  };

  window.filter = {
    onFilterChange: onFilterChange,
    renderAdverts: renderAdverts,
    sortByDistance: sortByDistance
  };
})();
