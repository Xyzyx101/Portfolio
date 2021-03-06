jQuery(document).ready(function ($) {
    "use strict";

    var sectionContainers = $(".section-container");
    sectionContainers.each(function () {
        $(this).children().not(".back-arrow,.forward-arrow").eq(0).addClass("current-article");
    });

    function updateArrows() {
        var navSections = $(".nav_section");
        navSections.each(function () {
            var arrows = $(this).children(".back-arrow,.forward-arrow");
            if (arrows.length === 0) return;
            var sectionContent = $(this).children(".section-container").children();
            if (sectionContent.length === 1) {
                noArrow(arrows);
            } else {
                if (sectionContent.first().is(".current-article")) {
                    forwardArrow(arrows);
                } else if (sectionContent.last().is(".current-article")) {
                    backArrow(arrows);
                } else {
                    bothArrow(arrows);
                }
            }
        });
    }
    updateArrows();

    function noArrow(arrows) {
        arrows.each(function () {
            $(this).css({ "visibility": "hidden" });
        });
    }

    function bothArrow(arrows) {
        arrows.each(function () {
            $(this).css({ "visibility": "visible" });
        });
    }

    function forwardArrow(arrows) {
        arrows.eq(0).css({ "visibility": "hidden" });
        arrows.eq(1).css({ "visibility": "visible" });
    }

    function backArrow(arrows) {
        arrows.eq(0).css({ "visibility": "visible" });
        arrows.eq(1).css({ "visibility": "hidden" });
    }

    $(".forward-arrow").on('click', function () {
        var $this = $(this);
        $this.parent().removeClass("slideInRight");
        $this.parent().removeClass("slideInLeft");
        $this.parent().addClass("slideOutRight");
        setTimeout(function () {
            $this.parent().removeClass("slideOutRight");
            $this.parent().addClass("slideInRight");
            var sectionContent = $this.siblings(".section-container").children();
            var i = 0;
            do {
                if (sectionContent.eq(i).is(".current-article")) {
                    sectionContent.eq(i).removeClass("current-article");
                    sectionContent.eq(i + 1).addClass("current-article");
                    break;
                }
                ++i;
            } while (i < sectionContent.length);
            updateArrows();
            calculateSectionSizes();
        }, 400); 
    });

    $(".back-arrow").on('click', function () {
        var $this = $(this);
        $this.parent().removeClass("slideInRight");
        $this.parent().addClass("slideOutLeft");
        setTimeout(function () {
            $this.parent().removeClass("slideOutLeft");
            $this.parent().addClass("slideInLeft");
            var sectionContent = $this.siblings(".section-container").children();
            var i = 0;
            do {
                if (sectionContent.eq(i).is(".current-article")) {
                    sectionContent.eq(i).removeClass("current-article");
                    sectionContent.eq(i - 1).addClass("current-article");
                    break;
                }
                ++i;
            } while (i < sectionContent.length);
            updateArrows();
            calculateSectionSizes();
        },400);
    });
    var scene = document.getElementById('parallax_parent');
    var parallaxSettings = {
        calibrateX: false,
        calibrateY: false,
        invertX: false,
        invertY: false,
        limitX: false,
        limitY: false,
        scalarX: 4,
        scalarY: 1,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5
    }
    var parallax = new Parallax(scene, parallaxSettings);

    /* Resize sections to fill screen vertically */
    function calculateSectionSizes() {
        var vHeight = $(window).height();
        var verticalNavBar = $("#vertical_nav");
        var sectionContainer = $(".section-container").add(".forward-arrow,.back-arrow");
        var sections = $(".nav_section");

        sectionContainer.css({
            "position": "relative",
            "top": "50%",
            "transform": "translateY(-50%)"
        });
        sections.css({
            "height": vHeight
        });
        verticalNavBar.css({
            "left": sectionContainer.offset().left,
            "border": "0px"
        });
    }
    calculateSectionSizes();
    $(window).resize(calculateSectionSizes);

    /* Nav bar */
    var contentSections = $('.nav_section');
    var navigationItems = $('#vertical_nav a');

    updateNavigation();
    
    $(window).on('scroll', function () {
        updateNavigation();
    });

    //smooth scroll to the section
    navigationItems.on('click', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    $(".down-arrow").on('click', function (event) {
        event.preventDefault();
        smoothScroll($("#section2"));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function () {
        $('.touch #cd-vertical-nav').toggleClass('open');

    });

    //close navigation on touch devices when selecting an element from the list
    $('.touch #cd-vertical-nav a').on('click', function () {
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    var scrolling = false;
    function updateNavigation() {
        var selected;
        if ($('.is-selected').length > 0) {
            selected = $('.is-selected')[0].hash;
        }
        contentSections.each(function () {
            var $this = $(this);
            var activeSection = $('#vertical_nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
            if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop())
                && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
        var newSelected = $('.is-selected')[0].hash;
        if (selected !== newSelected &&
            scrolling === false) {
            smoothScroll($(newSelected));
        }
    }

    function smoothScroll(target) {
        scrolling = true;
        $('body,html').animate(
            { 'scrollTop': target.offset().top },
            400,
            "swing",
            function () { scrolling = false;}
        );
    }
});
