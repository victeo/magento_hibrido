define(['jquery', 'dropdown'], function ($, dropdown) {
    /**
     * Create dropdown options simple
     *
     * @param $container
     * @param options
     */
    const createOptionsDefault = function ($container, options) {
        options.each(function (key, item) {
            const $item = $(item);
            if ($item[0].attributes.length != 0) {
                let label = '';
                if($item.data('desktop')) {
                    label = $(window).width() <= 768 ? $item.data('mobile') : $item.data('desktop');
                }
                const li = ' <li class="dropdown-option" data-value="' + $item.val() + '" data-text="' + $item.html() + label +
                    '" data-direction="' + $item.data('direction-value') + '"><span>' +
                        $item.html() + label +
                    '</span></li>';
                $container.append(li);
            }
        });
    }

    /**
     * Create dropdown options color
     *
     * @param $container
     * @param options
     */
    const createOptionsColor = function ($container, options) {
        options.each(function (key, item) {
            const $item = $(item);
            if ($item.val() !== "") {
                const li = ' <li class="dropdown-option color-option" data-value="' + $item.val() + '" data-text="' + $item.html() + '">' +
                    '<span class="color" style="background-color: ' + $item.data("color") + '"></span>' +
                    '<span>' + $item.html() + '</span>' +
                    '<input type="checkbox" name="' + $item.val() + '">\n' +
                    '                    <label for="' + $item.val() + '"></label>' +
                    '</li>';

                $container.append(li);
            }
        });
    }

    /**
     * Create dropdown options with checkbox
     *
     * @param $container
     * @param options
     */
    const createOptionsCheckbox = function ($container, options) {
        options.each(function (key, item) {
            const $item = $(item);
            if ($item.val() !== "") {
                const li = ' <li class="dropdown-option checkbox-option" data-value="' + $item.val() + '" data-text="' + $item.html() + '">' +
                    '<input type="checkbox" name="' + $item.val() + '">\n' +
                    '                    <label for="' + $item.val() + '"></label>' +
                    '<span>' + $item.html() + '</span>' +
                    '</li>';

                $container.append(li);
            }
        });
    }

    /**
     * Create options by type
     *
     * @param $container
     * @param options
     * @param type
     */
    const createOptions = function ($container, options, type) {
        switch (type) {
            case 'color':
                createOptionsColor($container, options);
                break;
            case 'checkbox':
                createOptionsCheckbox($container, options);
                break;
            default:
                createOptionsDefault($container, options);
        }
    }

    const handleDisabled = function ($container, $element) {
        const $triggerAction = $container.find('.action.toggle');
        $triggerAction.addClass('disabled');
    }

    /**
     *  Trigger select changes
     *
     * @param $container
     * @param $select
     * @param config
     */
    const triggerChange = function ($container, $select, config) {
        const $action = $container.find('.action.toggle span');
        const $options = $container.find('.dropdown-option');

        $options.on('click', function () {
            const value = $(this).data('value');
            const text = $(this).data('text');

            $options.removeClass('selected');
            $action.html(text);
            $(this).addClass('selected');

            if (config.extraData && $(this).data(config.extraData))
                $select.data(config.extraData, $(this).data(config.extraData));
            $select.data('option-value', value);
            $select.val(value);
            $select.trigger('change');

            $container.removeClass('default');
        });
    }

    const setDefaultValue = function ($container, $select, $option, setDefault) {
        const $action = $container.find('.action.toggle span');
        const $options = $container.find('.dropdown-option');

        const value = $option.val();
        let label = '';
        if($option.data('desktop')) {
            label = $(window).width() <= 768 ? $option.data('mobile') : $option.data('desktop');
        }
        const text = $option.text() + label;

        $options.removeClass('selected');
        $action.html(text);
        $option.addClass('selected');

        //$select.val(value);

        if (setDefault)
            $select.trigger('change');

        $container.removeClass('default');
    }
    /**
     * Initialize function
     */
    return function (config, element) {
        const $element = $(element);

        // Hide select
        $element.wrap('<div class="dropdown-container"></div>');
        $element.hide();

        const $container = $element.closest('.dropdown-container');

        const $options = $element.find('option');

        let defaultValue = '';
        defaultValue = defaultValue !== '' ? defaultValue : (config.label ?? 'Select');

        const $actionHtml = ' <button class="action toggle" data-toggle="dropdown" aria-haspopup="true">\n' +
            '        <span>' + defaultValue + '</span>\n' +
            '     </button>';

        const $optionsContainerHtml = '<ul class="dropdown-options" data-target="dropdown"></ul>';

        $container.append($actionHtml);
        $container.append($optionsContainerHtml);

        // Create options
        const $optionsContainer = $container.find('.dropdown-options');
        createOptions($optionsContainer, $options, (config.type ?? 'default'));

        // initialize dropdown
        $container.dropdown();

        // trigger changes
        triggerChange($container, $element, config);

        // Check if it's disabled
        if ($element.prop('disabled')) {
            $container.addClass('disabled');

            handleDisabled($container, $element);
        }


        // Check if it's default
        const selectedOption = $element.find('option:selected');
        if (!selectedOption.length || selectedOption.val() === '') {
            $container.addClass('default');
        } else {
            let setDefault = config.setDefault !== undefined ? config.setDefault : true;
            setDefaultValue($container, $element, $(selectedOption), setDefault);
        }

        if (config.filter ?? '') {
            var searchParams = new URLSearchParams(window.location.search);
            $('.sorter .dropdown-container .dropdown-options .dropdown-option').each(function (index, element) {
                if (index == 2) {
                    $(this).on('click', function () {
                        if ('URLSearchParams' in window) {
                            searchParams.set("product_list_dir", "desc");
                            searchParams.set("product_list_order", "price");
                            window.location.search = searchParams.toString();
                        }
                    })
                } else {
                    $(this).on('click', function () {
                        if ('URLSearchParams' in window && (searchParams.get('product_list_dir' != 'asc'))) {
                            searchParams.set("product_list_dir", "asc");
                            window.location.search = searchParams.toString();
                        }
                    })
                }
            });

            $('.sorter .dropdown-container').each(function (index, element) {
                $(this).on('click', function () {
                    $(".filter-options-item.active").collapsible("deactivate");
                })
            });
        }
    };
});
