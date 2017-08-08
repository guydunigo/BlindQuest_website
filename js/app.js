var main = function() {
    //$(".down-arrow button").click(scrollToNextSlide);
    $(document).on("click",".down-arrow button",scrollToNextSlide);
}

var getCurrentSlideIndex = function() {
    const slidesOffsets = $(".slide").map(function(index, elm) {return $(elm).offset().top});
    const currentScroll = $("html,body").scrollTop();
    var i = 0;

    for(i = slidesOffsets.length - 1 ; i > 0 && currentScroll < slidesOffsets[i] ; i--) {}

    return i;
}

var getSlideTopOffset = function(slideIndex) {
    var slides = $(".slide");
    if (slideIndex < 0)
        slideIndex = 0;
    else if (slideIndex >= slides.length)
        slideIndex = slides.length -1;

    return $(slides[slideIndex]).offset().top;
}

var scrollToPreviousSlide = function() {
    $("html, body").animate({'scrollTop': getSlideTopOffset(getCurrentSlideIndex()-1)}, 500);
}
var scrollToNextSlide = function() {
    $("html, body").animate({'scrollTop': getSlideTopOffset(getCurrentSlideIndex()+1)}, 500);
}

$(document).ready(main);