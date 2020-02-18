'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };
  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.error');

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

  var onLoadError = function (errorMessage) {
    var error = templateError.cloneNode(true);
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
  };
    // var node = document.createElement('div');
    // node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    // node.style.position = 'absolute';
    // node.style.left = 0;
    // node.style.right = 0;
    // node.style.fontSize = '30px';
    //
    // node.textContent = errorMessage;
    // document.body.insertAdjacentElement('afterbegin', node);
  // };

  var onSuccess = function (successMessage) {
    var success = templateSuccess.cloneNode(true);
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
    success.querySelector('.success__massage').textContent = successMessage;
    document.querySelector('keydown', onSuccessEsc);
    document.querySelector('click', onRemoveSuccess);
  };

  var save = function (data, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        onError('');
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
    xhr.send(data);
  };

  window.api = {
    load: load,
    save: save,
    onLoadError: onLoadError,
    onSuccess: onSuccess
  };

})();
