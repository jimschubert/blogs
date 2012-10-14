;
/* The MIT License
 
    Copyright (c) 2011 Jim Schubert

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/
(function($) {
    var defaults = {
        boxCss: "example-box",
        labelCss: "example-label",
        keywords: { 
            "function":"blue", 
            "this":"blue", 
            "jQuery":"red",        
            "var": "blue",
            "return": "blue",
            "join": "red",
            "Object": "green",
            "RegExp": "green" },
        onError: function() { },
        exampleAttr: ""
    };

    var example = function(opts) {
        var options = $.extend({}, defaults, opts);

        var wrapperHtml = [
            '<div class="',
            options.boxCss,
            '"></div>'
        ].join('');

        var labelArr = [
            '<span class="',
            options.labelCss,
            '">',
            "Example",
            '</span>'
        ];

        return this.each(function() {
            // Find node for replacing text.
            var replacementNode = $(this).children('code').andSelf().filter('code');

            if(replacementNode.length == 0) {
                if(typeof options.onError === "function"){
                    options.onError("No code nodes found");
                }
                
                return;
            }
            
            var labelText = "Example";
            if(options.exampleAttr) {
                labelText = $(this).attr(options.exampleAttr);
            }

            var labelHtml = [
                '<span class="',
                options.labelCss,
                '">',
                labelText,
                '</span>'
            ].join('');

            $(this).wrap(wrapperHtml);
            $(this).before(labelHtml);
            
            var originalText = replacementNode.text();
            
            Object.keys(options.keywords).forEach(function(key,idx){
                var replacement = [
                    '<span class="',
                    options.keywords[key],
                    '">',
                    key,
                    '</span>'
                ].join('');
                
                var re = new RegExp(key,"g");
                originalText = originalText.replace(re, replacement);
            });
            
            replacementNode.html(originalText);
        });
    };

    $.fn.example = example;
})(jQuery);
