(function () {
    const main = function () {
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

    const getCurrentSlideIndex = function () {
        const slidesOffsets = $(".slide").map(function (index, elm) { return $(elm).offset().top; });
        const currentScroll = $(window).scrollTop() + $(window).height() / 2;
        let i = 0;

        for (i = slidesOffsets.length - 1; i > 0 && currentScroll < slidesOffsets[i]; i--);

        return i;
    }

    const getSlideTopOffset = function (slideIndex) {
        const slides = $(".slide");
        if (slideIndex < 0)
            slideIndex = 0;
        else if (slideIndex >= slides.length)
            slideIndex = slides.length - 1;

        return $(slides[slideIndex]).offset().top;
    }

    const scrollToPreviousSlide = function () {
        $("html, body").animate({ 'scrollTop': getSlideTopOffset(getCurrentSlideIndex() - 1) }, 500);
    }
    const scrollToNextSlide = function () {
        $("html, body").animate({ 'scrollTop': getSlideTopOffset(getCurrentSlideIndex() + 1) }, 500);
    }

    const hideArrowsOnScroll = function () {
        const scrollTop = $(window).scrollTop();
        const navLinks = $("#navbar-links li");

        if (scrollTop <= getSlideTopOffset(0))
            $(".up-arrow").addClass("hidden")
        else
            $(".up-arrow").removeClass("hidden")

        if (scrollTop >= getSlideTopOffset($(".slide").length - 1))
            $(".down-arrow").addClass("hidden")
        else
            $(".down-arrow").removeClass("hidden")

        navLinks.removeClass("active");
        $(navLinks[getCurrentSlideIndex()]).addClass("active");
    }

    $(document).ready(main);
})()