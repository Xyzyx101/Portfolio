jQuery(document).ready(function($){

    (function setupParallax () {
        var options = { mouseport : $("#parallax_viewport"), 
                        xorigin : 0.5, 
                        yorigin : -1,
                        height : 3200,
                        decay : 0.99};
        var optionsBig = { xparallax : 0.02,
                           yparallax : 0.05};
        var optionsMed = { xparallax : 0.04,
                           yparallax : 0.12};
        var optionsSmall = { xparallax : 0.08,
                             yparallax : 0.24};
        
        console.log($(".parallax_layer").length);
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
        var sectionContents = $(".section_content");
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
    //smooth scroll to second section
    /*TODO
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
     });*/
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
