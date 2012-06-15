(function($) { 
	$.fn.fixedHeader = function(options) {
		var settings = { 
			selector: 'thead:first',
			cssClass: 'fixed',
			fixTo: 0
		};
		
		var _fixHeader = function(obj) { 
			var header = $(obj.selector, obj.elem);
			if(header) {
				var parent =  header.parents('table:first') || header.parent();
				(parent && parent.css({ borderCollapse: 'collapse'}) );
				
				var data = header.data('fixedHeader') || header.data('fixedHeader', { 
						top: header.offset().top,
						width: parent.find('tr:eq(1)').width(),
						cells: parent.find('tr:eq(1) > td'),
						processed: false
					});
				var top = data.top - $(document).scrollTop();
				if( top < 0 ) {
					header.addClass(obj.css);	
					if(!data.processed){
						header.width(data.width);
						for(var i = 0; i<data.cells.length;i++) {
							$('th:eq('+i+')', header).width($(data.cells[i]).width());
						}
					}
					
				} else { 
					header.removeClass(obj.css); 
				}
			}		
		};
		return this.each(function() {
			var self = this;
			if("object" === typeof options) {
				$.extend(settings, options);
			}
			if($(self).parents('table:first')){
				$(window).bind('scroll.fixedHeader', function() {
					_fixHeader({ 
						elem: self,
						selector: settings.selector,
						css: settings.cssClass,
						top: settings.fixTo
					});
				});
			}
		});
	};
})(jQuery);
