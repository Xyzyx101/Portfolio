(function () {
    function calculateSectionSizes() {
        var vHeight = $(window).height(),
            vWidth = $(window).width(),
            sections = $('section');

        sections.css({
            "height":vHeight,
            "width":vWidth
        });
    };
    calculateSectionSizes();
    $(window).resize(calculateSectionSizes);
})();