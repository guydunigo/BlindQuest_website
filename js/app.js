var main = function () {
    $(".up-arrow button").click(scrollToPreviousSlide);
    $(".down-arrow button").click(scrollToNextSlide);

    $(window).scroll(hideArrowsOnScroll);

    hideArrowsOnScroll();

    $("html").keydown(function (t) {
        switch (t.which) {
            case 38:
                scrollToPreviousSlide();
                break;
            case 32:
            case 40:
                scrollToNextSlide();
                break;
            default:
                break;
        }
    })
}

var getCurrentSlideIndex = function () {
    const slidesOffsets = $(".slide").map(function (index, elm) { return $(elm).offset().top });
    const currentScroll = $("html,body").scrollTop() + $(window).height() / 2;
    var i = 0;

    for (i = slidesOffsets.length - 1; i > 0 && currentScroll < slidesOffsets[i]; i--);

    return i;
}

var getSlideTopOffset = function (slideIndex) {
    var slides = $(".slide");
    if (slideIndex < 0)
        slideIndex = 0;
    else if (slideIndex >= slides.length)
        slideIndex = slides.length - 1;

    return $(slides[slideIndex]).offset().top;
}

var scrollToPreviousSlide = function () {
    $("html, body").animate({ 'scrollTop': getSlideTopOffset(getCurrentSlideIndex() - 1) }, 500);
}
var scrollToNextSlide = function () {
    $("html, body").animate({ 'scrollTop': getSlideTopOffset(getCurrentSlideIndex() + 1) }, 500);
}

var hideArrowsOnScroll = function () {
    var tmp = $("html,body").scrollTop();

    if (tmp <= getSlideTopOffset(0))
        $(".up-arrow").addClass("hidden")
    else
        $(".up-arrow").removeClass("hidden")

    if (tmp >= getSlideTopOffset($(".slide").length - 1))
        $(".down-arrow").addClass("hidden")
    else
        $(".down-arrow").removeClass("hidden")

    tmp = $("#navbar-links li");
    tmp.removeClass("active");
    $(tmp[getCurrentSlideIndex()]).addClass("active");
}

$(document).ready(main);