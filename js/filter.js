'use strict';

(function () {

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelector('#housing-features');

  // Значение фильтра по умолчанию
  var defaultFilter = 'any';
  var adverts = [];
  var filteredAdverts = [];

  var filterByHouseType = function (advert) {
    if (housingType.value === defaultFilter ||
      housingType.value === advert.offer.type) {
      return true;
    }
    return false;
  };

  var filterByPrice = function (advert) {
    if (housingPrice.value === defaultFilter || (MIN_PRICE <= advert.offer.price && MAX_PRICE >= advert.offer.price)) {
      return true;
    }
    return false;
  };

  var filterByRooms = function (advert) {
    if (housingRooms.value === defaultFilter || parseFloat(housingRooms.value) === advert.offer.rooms) {
      return true;
    }
    return false;
  };

  var filterByGuests = function (advert) {
    if (housingGuests.value === defaultFilter || parseFloat(housingGuests.value) === advert.offer.guests) {
      return true;
    }
    return false;
  };

  var filterByFeatures = function (advert) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    var check = true;
    checkedFeatures.forEach(function (item) {
      check = check && advert.offer.features.includes(item.value);
    });
    return check;
  };

  var getFilteredAdverts = function () {
    for (var i = 0; i < adverts.length; i++) {
      if (filterByHouseType(adverts[i]) && filterByPrice(adverts[i]) &&
        filterByGuests(adverts[i]) && filterByRooms(adverts[i]) &&
        filterByFeatures(adverts[i])) {
        filteredAdverts.push(adverts[i]);
        if (filteredAdverts.length === window.pin.MAX_AMOUNT) {
          break;
        }
      }
    }
    return filteredAdverts;
  };

  var onFilterChange = function () {
    window.card.removeMapCard();
    window.pin.removePins();
    window.pin.renderMapPins(getFilteredAdverts(), window.pin.MAX_AMOUNT);
  };

  // var onFilterChange = function () {
  //   filteredAdverts = adverts;
  //
  //   var filters = {
  //     type: housingType.value,
  //     price: housingPrice.value,
  //     rooms: housingRooms.value,
  //     guests: housingGuests.value,
  //     features: Array.from(document.getElementsByName('features')).filter(function (feature) {
  //       return feature.checked;
  //     }).map(function (feature) {
  //       return feature.value;
  //     })
  //   };
  //
  //   var keys = Object.keys(filters);
  //   keys.forEach(function (key) {
  //     var value = filters[key];
  //     switch (key) {
  //       case 'type':
  //         filteredAdverts = (value !== 'any') ? filterByHouseType(value) : filteredAdverts;
  //         break;
  //       case 'price':
  //         filteredAdverts = (value !== 'any') ? filterByPrice(value) : filteredAdverts;
  //         break;
  //       case 'rooms':
  //         filteredAdverts = (value !== 'any') ? filterByRooms(value) : filteredAdverts;
  //         break;
  //       case 'guests':
  //         filteredAdverts = (value !== 'any') ? filterByGuests(value) : filteredAdverts;
  //         break;
  //       case 'features':
  //         filteredAdverts = (value.length > 0) ? filterByFeatures(value) : filteredAdverts;
  //         break;
  //
  //       default:
  //         return true;
  //     }
  //     return true;
  //   });
  //
  //   window.card.removeMapCard();
  //   window.pin.removePins();
  //   window.pin.renderMapPins(filteredAdverts);
  //
  //   return false;
  // };

  // var filterByHouseType = function (type) {
  //   if (type !== defaultFilter) {
  //     return filteredAdverts.filter(function (advert) {
  //       return advert.offer.type === type;
  //     });
  //   }
  //   return false;
  // };

  // var filterByPrice = function (value) {
  //   return filteredAdverts.filter(function (advert) {
  //     switch (value) {
  //       case 'low':
  //         return advert.offer.price < MIN_PRICE;
  //       case 'middle':
  //         return advert.offer.price <= MAX_PRICE && advert.offer.price >= MIN_PRICE;
  //       case 'high':
  //         return advert.offer.price >= MAX_PRICE;
  //       default:
  //         return false;
  //     }
  //   });
  // };

  // var filterByFeatures = function (features) {
  //   return filteredAdverts.filter(function (advert) {
  //     return features.every(function (feature) {
  //       return (advert.offer.features.indexOf(feature) > -1);
  //     });
  //   });
  // };

  // var renderAdverts = function (data) {
  //   adverts = data;
  //   window.pin.renderMapPins(adverts.slice(0, window.pin.MAX_AMOUNT));
  // };
  //
  // // Сортирует пины по расстоянию от главной метки
  // var sortByDistance = function (x, y, max) {
  //   var sortedPins = adverts.sort(function (first, second) {
  //     var firstSortedPin = Math.round(Math.sqrt(Math.pow(first.location.x - x, 2) + Math.pow(first.location.y - y, 2)));
  //     var secondSortedPin = Math.round(Math.sqrt(Math.pow(second.location.x - x, 2) + Math.pow(second.location.y - y, 2)));
  //
  //     return firstSortedPin - secondSortedPin;
  //   });
  //   return (sortedPins.length > max) ? sortedPins.slice(0, max) : sortedPins;
  // };

  window.filter = {
    onFilterChange: onFilterChange,
    // renderAdverts: renderAdverts,
    // sortByDistance: sortByDistance
  };
})();
