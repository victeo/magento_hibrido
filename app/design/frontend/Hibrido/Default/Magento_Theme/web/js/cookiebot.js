require([
    'jquery',
    'https://consent.cookiebot.com/uc.js?cbid=84634c6c-8c67-4e42-8933-3efba4ef65c9',
    'domReady!'
], function ($, cookie) {
    'use strict';

    $(document).on('click', '#open-cookiebot', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('.CookiebotWidget-logo').trigger('click');
        $('#CookiebotWidget').show();
    });
});
