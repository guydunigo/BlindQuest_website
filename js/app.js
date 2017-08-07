var main = function() {
    $("down-arrow button").click(function() {
        $("htlm, body").animate({'scrolltop': findNextRow(this)}, 500);
    })
}

var findNextRow = function(elm) {
    while(! elm.hasClass("row"))
        elm = elm.parent();

    return elm.next();
}

$(document).ready(main);