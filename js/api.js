'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (formData, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL_SAVE);
    xhr.send(formData);
  };

  var onLoadError = function () {
    var onRemoveError = function () {
      error.removeEventListener('click', onRemoveError);
      error.remove();
    };
    var error = errorTemplate.cloneNode(true);
    error.addEventListener('click', function (event) {
      if (event.target === event.currentTarget) {
        onRemoveError();
      }
    });
    var errorBtn = error.getElementsByClassName('error__button')[0];
    errorBtn.onclick = function () {
      error.remove();
      var adForm = document.querySelector('.ad-form');
      save(new FormData(adForm), window.api.onLoadSuccess, window.api.onLoadError);
    };

    document.onkeydown = function (event) {
      if (event.key === 'Escape') {
        onRemoveError();
      }
    };
    document.body.appendChild(error);
  };

  var onLoadSuccess = function () {
    var onRemoveSuccess = function () {
      success.removeEventListener('click', onRemoveSuccess);
      success.remove();
    };
    var success = successTemplate.cloneNode(true);
    success.addEventListener('click', function (event) {
      if (event.target === event.currentTarget) {
        onRemoveSuccess();
      }
    });

    document.onkeydown = function (event) {
      if (event.key === 'Escape') {
        onRemoveSuccess();
      }
    };
    document.body.appendChild(success);
  };

  window.api = {
    load: load,
    save: save,
    onLoadError: onLoadError,
    onLoadSuccess: onLoadSuccess
  };

})();
