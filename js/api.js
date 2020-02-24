'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200,
    MULTIPLE_CHOICES: 300,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
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

  var onLoadError = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    var onLoadErrorEsc = function (evt) {
      if (evt.key === 'Escape') {
        onRemoveError();
      }
    };
    var onRemoveError = function () {
      error.remove();
      document.querySelector('keydown', onLoadErrorEsc);
      document.querySelector('click', onLoadError);
    };
    error.querySelector('.error__massage').textContent = errorMessage;
    document.querySelector('keydown', onLoadErrorEsc);
    document.querySelector('click', onRemoveError);
    document.querySelector('main').append(error);
  };

  var onLoadSuccess = function () {
    var success = successTemplate.cloneNode(true);
    var onSuccessEsc = function (evt) {
      if (evt.key === 'Escape') {
        onRemoveSuccess();
      }
    };
    var onRemoveSuccess = function () {
      success.remove();
      document.querySelector('keydown', onSuccessEsc);
      document.querySelector('click', onRemoveSuccess);
    };
    // success.querySelector('.success__massage').textContent = successMessage;
    document.querySelector('keydown', onSuccessEsc);
    document.querySelector('click', onRemoveSuccess);
    document.body.append(success);
  };

  window.api = {
    load: load,
    save: save,
    onLoadError: onLoadError,
    onLoadSuccess: onLoadSuccess
  };

})();
