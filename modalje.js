/*
 * Modalje 0.0.1
 * Simple script to creating modals.
 * -------------------------
 * Author: Paweł Dziergas - http://pewuel.com
 * -------------------------
 */


var Modalje = function(element, cookieName, cookieExpireInMinutes, buttonSelector) {

    var existingElement =  document.querySelector(element),
        html = document.querySelector('html'),
        buttonSelector = buttonSelector || '.modal__close',
        existingButton = document.querySelector(buttonSelector);

    if (!existingElement) {
        return;
    }
    existingElement.style.visibility = 'hidden';

    if (!cookieName) {
        return;
    }

    if (!isNaN(cookieExpireInMinutes) && isFinite(cookieExpireInMinutes)) {

        cookieExpireInMinutes = cookieExpireInMinutes;

    } else {

        cookieExpireInMinutes = '1440';

    }


    var closeButton = {

        watch:  function() {

            var modal = document.querySelector(element),
                button = document.querySelector(buttonSelector);

            console.log('closeButton.watch() called');
            console.log('closeBtnEL ' + closeButton.el);
            console.log('button ' + button);

            button.addEventListener('click', function() {
                modal.style.visibility = 'hidden';
            });

        },
        create: function() {

            var btn = document.createElement('button');
            btn.classList.add('modal__close');
            existingElement.appendChild(btn);
        }

    };

    if (!existingButton) {

        closeButton.create();
    }


    var cookie = {

        cookieName: 'modalje-' + cookieName,

        create: function(expireInMinutes) {

            var date = new Date(),
                expires;

            date.setTime(date.getTime() + (expireInMinutes*60*1000));
            expires = date.toUTCString();

            document.cookie = cookie.cookieName+"=enabled; expires="+expires;
        },

        exist: function() {

            return document.cookie.indexOf(cookie.cookieName) >= 0;

        },

        remove: function() {

            document.cookie = cookie.cookieName+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        }

    };


    return {

        init: function() {

            console.log('cN' + cookieName);


            if (cookie.exist()) {
                existingElement.style.visibility = 'hidden';
                html.classList.remove('modal-is-enabled');
            } else {
                cookie.create(cookieExpireInMinutes);
                existingElement.style.visibility = 'visible';
                html.classList.add('modal-is-enabled');
                closeButton.watch();
            }

        },

        destroy: function() {

            cookie.remove();

        }

    }



};