define([
    'jquery'
], function ($) {
    return function (config, element) {
        let tbody = $(element).find('tbody');

        $.each(tbody, function (key, tr) {
            $('tr', this).on('click', function (e) {
                if(!$(e.target).parents('a').length) {
                    let rowId = $(this).attr('id');
                    window.location.href = $('#' + rowId + ' ' + config.trigger).attr('href');
                }
            });
        })
    };
});
