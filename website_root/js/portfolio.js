(function () {
    function calculateSectionSizes() {
        var vHeight = $(window).height();
        var sectionContents = $('.section_content');
        var sections = $('section');

        sectionContents.css({
            "position":"relative",
            "top":"50%",
            "transform":"translateY(-50%)"
        });
        sections.css({
            "height":vHeight,
        })
    };
    calculateSectionSizes();
    $(window).resize(calculateSectionSizes);
})();

/*
	position:relative;
    top: 50%;
	transform: 			translateY(-50%);
*/