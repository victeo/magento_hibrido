define([
        'uiComponent',
        'jquery'
    ],
    function(Component, $) {
        "use strict";

        return Component.extend({
            initialize: function (data, element) {
                const $element = $(element);
                $element.scrollTop($element[0].scrollHeight);
            }
        });
    });
