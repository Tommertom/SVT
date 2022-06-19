/* Mobile menu: */
(function($) {
  $.fn.collapsable = function(options) {
    // iterate and reformat each matched element
    return this.each(function() {
      // cache this:
      var obj = $(this);
      var tree = obj.next('.nav-menu');
      obj.click(function(){
        if( obj.is(':visible') ){ tree.slideToggle("fast");}
      });
      $(window).resize(function(){
        if ( $(window).width() <= 570 ){tree.attr('style','');};
      });
    });
  };
})(jQuery);

$(document).on('click', '.main-menu .slide-trigger', function() {
    $(".nav-menu").slideToggle("fast", function() {
        if ($(this).is(':hidden')) {
            // remove the 'display: none' inline style that slideToggle introduces when collapsing menu
            $(this).attr("style", "");
        }
    });
});
