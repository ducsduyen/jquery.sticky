/*
jQuery.Sticky v1.0.1 
Author: ducsduyen 
Updated: 31/03/2016
*/

(function ($) {

    $.fn.sticky = function (options) {
        // Bob's default settings:
        var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            debug: false
        };
        var settings = $.extend({}, defaults, options);

        var log = function (message, params) {
            if (typeof console == "object" && $.fn.sticky.debug) {
                console.log(message, params);
            }
        }
        var scroller = function ($this, $offsetParent, $holder) {

            var offset = $holder.offset();

            var windowpos = $(window).scrollTop();
            var stickermax = $(document).outerHeight() - settings.bottomSpacing - settings.topSpacing - $this.outerHeight();

            if (stickermax <= 0 //if sticker not has spacing to slide
                || $this.height() <= 0  //if sticker height equal 0

            ) {
                return;
            }

            if (windowpos > (offset.top - settings.topSpacing)
                && windowpos < stickermax
                ) {
                if ($this.css("position") != "fixed") {
                    $this.trigger("sticky-start");
                    log("event", "sticky-start");
                    $this.css({ position: "fixed", top: settings.topSpacing }); //stick it
                }
                //$holder.height($this.outerHeight());//show holder
                $this.trigger("sticky-bottom-unreached");
                log("event", "sticky-bottom-unreached");

            } else if (windowpos > (offset.top - settings.topSpacing)
                && windowpos >= stickermax
                ) {

                if ($this.css("position") == "fixed") { //if sticky started
                    $this.trigger("sticky-bottom-reached");
                    log("event", "sticky-bottom-reached");
                    $this.css({ position: "absolute", top: (stickermax - $offsetParent.offset().top + settings.topSpacing) + "px" });
                } else if ($this.css("position") == "absolute") { //if sticky bottom reached

                    $this.css({ top: (stickermax - $offsetParent.offset().top + settings.topSpacing) + "px" });
                    //$holder.height($this.outerHeight());//show holder
                    log("stickermax - $offsetParent.offset().top", stickermax - $offsetParent.offset().top);
                } else { //if sticky not started

                }

            } else { //if windowpos < offset.top - settings.topSpacing

                if ($this.css("position") == "fixed" || $this.css("position") == "absolute") {
                    $this.trigger("sticky-end");
                    log("event", "sticky-end");
                }

                //$holder.height(0);//Ẩn holder
                $this.css({ position: "", top: "" });
            }

            log("ooffset", offset);
            log("position", $this.position());
            log("offset", $this.offset());
            log("windowpos", windowpos);
            log("$offsetParent.offset().top", $offsetParent.offset().top);
            log("height", $this.height());
            log("stickermax", stickermax);
        };

        return this.each(function () {

            var $this = $(this);
            var $offsetParent = $this.offsetParent();

            $this.width($this.width());//set css width for sticker
            var $holder = $("<div class='sticky-holder' style='visibility: hidden;height:0;display:block'></div>").insertBefore($this);

            scroller($this, $offsetParent, $holder);

            $(window).scroll(function () { scroller($this, $offsetParent, $holder); });

        });
    }
    //$.fn.sticky.debug = true;

}(jQuery));
