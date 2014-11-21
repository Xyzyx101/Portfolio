jQuery(document).ready(function($){

    var navSections = $(".nav_section");
    navSections.each(function () {
        $(this).children().not(".back-arrow,.forward-arrow").eq(0).addClass("current-article");
    });

    function updateArrows () {
        var navSections = $(".nav_section");
        navSections.each(function () {
            var arrows = $(this).children(".back-arrow,.forward-arrow");
            if (arrows.length === 0) return;
            var sectionContent = $(this).children().not(".back-arrow,.forward-arrow");
            var currentArticle = $(this).children().filter(".current-article");
            if( sectionContent.length === 1) {
                noArrow(arrows);
            } else {
                if ( sectionContent.first().is(".current-article") ) {
                    forwardArrow(arrows);
                } else if ( sectionContent.last().is(".current-article") ) {
                    backArrow(arrows);
                } else {
                    bothArrow(arrows);
                }
            }
        });
    }
    updateArrows();
    function noArrow (arrows) {
        arrows.each(function () {
            $(this).css({"visibility" : "hidden"});
        });
    }
    function bothArrow (arrows) {
        arrows.each(function () {
            $(this).css({"visibility" : "visible"});
        });
    }
    function forwardArrow (arrows) {
        arrows.eq(0).css({"visibility" : "hidden"});
        arrows.eq(1).css({"visibility" : "visible"});
    }
    function backArrow (arrows) {
        arrows.eq(0).css({"visibility" : "visible"});
        arrows.eq(1).css({"visibility" : "hidden"});
    }

    $(".forward-arrow").on('click', function(){
        var sectionContent = $(this).siblings().not(".back-arrow,.forward-arrow");
        var i = 0;
        do {
            if( sectionContent.eq(i).is(".current-article") ) {
                sectionContent.eq(i).removeClass("current-article");
                sectionContent.eq(i+1).addClass("current-article");
                break;
            }
            ++i;
        } while (i < sectionContent.length)
        updateArrows();
        calculateSectionSizes();
    });
    $(".back-arrow").on('click', function(){
        var sectionContent = $(this).siblings().not(".back-arrow,.forward-arrow");
        var i = 0;
        do {
            if( sectionContent.eq(i).is(".current-article") ) {
                sectionContent.eq(i).removeClass("current-article");
                sectionContent.eq(i-1).addClass("current-article");
                break;
            }
            ++i;
        } while (i < sectionContent.length)
        updateArrows();
        calculateSectionSizes();
    });


    (function setupParallax () {
        var parallaxViewport = $("#parallax_viewport");
        var options = { mouseport : parallaxViewport,
                        xorigin : 0.5,
                        yorigin : 0.0,
                        decay : 0.97,
                        frameDuration : 50};
        var optionsBig = { xparallax : -0.24,
                           yparallax : -0.12};
        var optionsMed = { xparallax : -0.12,
                           yparallax : -0.06};
        var optionsSmall = { xparallax : -0.07,
                             yparallax : -0.03};
        $(".parallax_layer").parallax(
            options,
            optionsBig,
            optionsMed,
            optionsSmall
        );
    })();

    /* Resize sections to fill screen vertically */
    function calculateSectionSizes() {
        var vHeight = $(window).height();
        var verticalNavBar = $("#vertical_nav");
        var sectionContents = $(".section_content").add(".forward-arrow,.back-arrow");
        var sections = $(".nav_section");

        sectionContents.css({
            "position" : "relative",
            "top" : "50%",
            "transform" : "translateY(-50%)"
        });
        sections.css({
            "height" : vHeight
        });
        verticalNavBar.css({
            "left" : sectionContents.offset().left,
            "border" : "0px"
        });
    };
    calculateSectionSizes();
    $(window).resize(calculateSectionSizes);

    /* Nav bar */
    var contentSections = $('.nav_section');
    var navigationItems = $('#vertical_nav a');

    updateNavigation();
    $(window).on('scroll', function(){
        updateNavigation();
    });
    //smooth scroll to the section
    navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    $(".down-arrow").on('click', function(event){
        event.preventDefault();
        smoothScroll($("#section2"));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
        $('.touch #cd-vertical-nav').toggleClass('open');

    });
    //close navigation on touch devices when selecting an element from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
        $('.touch #cd-vertical-nav').removeClass('open');
    });
    function updateNavigation() {
        contentSections.each(function(){
            $this = $(this);
            var activeSection = $('#vertical_nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
            if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
                navigationItems.eq(activeSection).addClass('is-selected');
            }else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }
    function smoothScroll(target) {
        $('body,html').animate(
            {'scrollTop':target.offset().top},
            600
        );
    }
});
