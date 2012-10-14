;(function($) {
    var defaults = {
        arr: [1,2,3,4,5,6],
        sample: "sample",
        style: "style"
    };

    var example = function(opts) {
        // merge opts with defaults into new object
        // so changes don't change defaults
        var options = $.extend({}, defaults, opts);

        return this.each(function() {
            console.log({ 
                elem: this.innerText,
                options: options
            });
        });
    };

    $.fn.example = example;
})(jQuery);
