requirejs(
    ['require', 'jquery', 'mage/translate'],
    function (require, $, $t) {
        'use strict';

        /**
         * Ready funcs
         */
        $(document).ready(function () {
            $('.minisearch .label').on('click', function () {
                if ($('.minisearch').hasClass('active')) {
                    $('.minisearch').removeClass('active');
                } else {
                    $('.minisearch').addClass('active');
                    //wait for fade (300ms)
                    setTimeout(function () {
                        $('.minisearch input').focus();
                    }, 300);
                }
            });


            $(".footer-accordion-toggle").on('click', function () {
                $(this).toggleClass('show');
                $(this).siblings('.footer-accordion-content').toggleClass('active');
            });


            // Check if page is on top
            const $win = $(window);
            if ($win.scrollTop() === 0) {
                $('body').addClass('page-top');
            }

            let lastScrollTop = 0;
            $win.on('scroll', function () {
                let st = window.pageYOffset || document.documentElement.scrollTop;
                if (st > lastScrollTop) {
                    $('body').removeClass('scrolling-up')
                } else if (st < lastScrollTop) {
                    $('body').addClass('scrolling-up')
                }
                lastScrollTop = st <= 0 ? 0 : st;

                if ($win.scrollTop() === 0)
                    $('body').addClass('page-top');
                else {
                    $('body').removeClass('page-top');
                }
            });
            $('._reload_page .pagebuilder-button-primary').on('click', function (e) {
                e.preventDefault();
                document.location.reload(true);
            })

            if (typeof URLSearchParams !== 'undefined') {
                const urlParams = new URLSearchParams(window.location.search);
                const logoutSuccess = urlParams.get('_l');
                if (logoutSuccess) {
                    // remove query param
                    window.history.pushState({}, document.title, window.location.pathname);

                    if (localStorage.getItem('loginSections')) {
                        localStorage.removeItem('loginSections');
                    }
                }
            }

        });
    }
);
