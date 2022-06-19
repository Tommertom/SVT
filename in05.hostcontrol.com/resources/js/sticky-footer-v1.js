$(window).load(function() {

    /* Create a sticky footer (not possible with CSS due to variable footer height) */

    var org_footer_margin = $(".footer-wrapper").css("margin-top");

    var postition_footer = function() {

        if(! $(".footer-wrapper").is(":last-child")) {
            return;
        }

        var window_height = $(window).height();
        var footer_height = $(".footer-wrapper").outerHeight();
        var total_height = 0;

        $(".layout-block-wrapper").each(function (index, wrapper) {
            if ($(wrapper).is(".footer-wrapper")) {
                return;
            }
            total_height += $(wrapper).outerHeight(true);
        });

        if ($(".extra-footer-wrapper").length) {
            total_height += $(".extra-footer-wrapper").outerHeight(true);
        }

        if (window_height > (total_height+footer_height)) {
            $(".footer-wrapper").css("margin-top", window_height - total_height - footer_height);
        } else {
            $(".footer-wrapper").css("margin-top", org_footer_margin);
        }
    }

    postition_footer();

    var resize_timeout = null;

    $(window).resize(function() {
        if(resize_timeout) {
            clearTimeout(resize_timeout);
        }
        resize_timeout = setTimeout(postition_footer, 250);
    });
});