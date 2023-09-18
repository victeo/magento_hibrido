define([
        'uiComponent',
        'jquery'
    ],
    function(Component, $) {
        "use strict";

        return Component.extend({
            initialize: function (data, element) {
                let $self = this;
                const $element = $(element);

                if(window.scrollY === 0){
                    //user is at the top of the page; no need to show the back to top button
                    document.body.classList.add('page-top');
                } else {
                    document.body.classList.remove('page-top');
                }

                $element.on('click', function(e) {
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                    //scroll smoothly back to the top of the page
                });

                let lastScrollTop = 0;
                window.addEventListener("scroll", function() {
                    if(window.scrollY === 0){
                        //user is at the top of the page; no need to show the back to top button
                        document.body.classList.add('page-top');
                    } else {
                        document.body.classList.remove('page-top');
                    }

                    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
                    if (st > lastScrollTop) {
                        document.body.classList.add('scrolling-down');
                        document.body.classList.remove('scrolling-up');
                    } else if (st < lastScrollTop) {
                        document.body.classList.add('scrolling-up');
                        document.body.classList.remove('scrolling-down');
                    }
                    $self.setTopPositionFilterBar(lastScrollTop, st)

                    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

                }, {passive: true});
                setTimeout(() => {
                    $element.show();
                }, 500)
            },
            /**
             * Set a top value for the filter bar
             *
             * @param lastScrollTop
             * @param st
             */
            setTopPositionFilterBar: function (lastScrollTop, st) {
                let $filter = $('.catalog-top-filters');
                if ($(window).width() >=1026 && $filter.length){
                    let $barTop = $('.page-header').outerHeight(false);
                    let $navSections = $('.sections.nav-sections').outerHeight(false);
                    let addMarginTop = $navSections + $barTop;
                    $filter.css('top', st < lastScrollTop ? addMarginTop : '');
                }
            }
        });
    });
