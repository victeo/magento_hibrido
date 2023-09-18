define([
        "uiComponent",
        "jquery"
    ],
    function(Component, $) {
        "use strict";

        return Component.extend({
            /**
             * Extends Component object by storage observable messages.
             */
            initialize: function (data, element) {
                const $element = $(element);
                const $input = $element.find('input[type="number"]');

                let newVal,
                    defaultValue = parseFloat($input.val()),
                    increment = data.increment || 1;

                if (data.defaultValue) {
                    defaultValue = data.defaultValue;
                }

                if(defaultValue > 1){
                    const $reduce = $element.find('.custom-qty.reduced .btn-qty');
                    $reduce.removeClass('disabled');
                }
                const $buttons =  $element.find('.btn-qty');

                $buttons.click(function (event) {
                    event.preventDefault();

                    let $button = $(this),
                        oldValue = parseFloat($input.val());

                    if (!oldValue || oldValue < increment) {
                        oldValue = 0;
                    }

                    if ($button.hasClass('plus')) {
                        newVal = oldValue + increment;
                    } else {
                        if (oldValue - increment > 0) {
                            newVal = oldValue - increment;
                        } else {
                            newVal = defaultValue;
                        }
                    }

                    newVal = parseFloat(newVal.toFixed(10));
                    $input.val(newVal);
                    $input.trigger('change');
                });

                $input.on('change', function() {
                    const value = $(this).val();

                    const $parent = $(this).closest('.control');
                    const $reduce = $parent.find('.custom-qty.reduced .btn-qty');

                    if (value > defaultValue) {
                        // enable decrement button
                        $reduce.removeClass('disabled');
                    } else {
                        // disable decrement button
                        $reduce.addClass('disabled');
                    }
                });
            }
        })
    });
