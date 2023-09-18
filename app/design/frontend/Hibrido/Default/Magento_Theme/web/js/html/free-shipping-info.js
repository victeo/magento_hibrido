define([
    'uiComponent',
    'jquery'
], function (Component, $) {
    "use strict";

    return Component.extend({
        initialize: function (data, element) {
            const $element = $(element);

            this.handleInfoAllowed($element);

            const action = document.createElement('span');
            const $action = $(action);
            $action.addClass('action action-close');

            const $row = $element.find('.row-full-width-inner');
            $row.append($action);

            $action.on('click', () => this.handleCloseInfo($element));
        },

        /**
         * Handle If info block is allowed (cookie set)
         *
         * @param $element
         */
        handleInfoAllowed: function ($element) {
            const freeShippingInfo = $.cookie('freeShippingInfo');

            if (freeShippingInfo) {
                $element.remove();
            } else {
                $element.show();
                $element.parents('.page-wrapper').find('.page-header').css('margin-top', $element.height());
            }
        },

        /**
         * Set cookie and remove block info
         *
         * @param $element
         */
        handleCloseInfo: function ($element) {
            $.cookie('freeShippingInfo', true, { expires: 86400 });
            $element.parents('.page-wrapper').find('.page-header').css('margin-top', 0);
            //timout 300ms = same as css transition
            setTimeout(function () {
                $element.remove();
            }, 300);
        }
    });
});
