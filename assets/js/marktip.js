(function($) {

	'use strict';
	
	$.fn.markTip = function(options) {
		
		var _this 			= this,
			mouseEnterFlag 	= true; // Flag for mouseenter; to make sure to run callback one at a time

		// Append tooltip to the DOM
		var appendTooltip = function(message) {
			// Fade effect On
			if(options.fadeEffect) {
				// Make sure append only 1 tooltip
				if(!$('.tooltip').length) $('<span class="tooltip"><span>').html(message).hide().appendTo('body').fadeIn('slow');
			} else {
			// Fade effect Off
				// Make sure append only 1 tooltip
				if(!$('.tooltip').length) $('<span class="tooltip"><span>').html(message).appendTo('body').hide();
			}
		};

		// Remove tooltip on the DOM
		var removeTooltip = function() {
			// Fade effect On
			if(options.fadeEffect) {
				$('.tooltip').fadeOut(function() {
					$(this).remove();
					mouseEnterFlag = true;
				});
			} else {
			// Fade effect Off
				$('.tooltip').remove();
				mouseEnterFlag = true;
			}
		};

		var initPositioning = function(direction, offset, parentOffset, $parent) {

			var position = {}, xCenter, yCenter; 

			// Get Tooltip vertical centers
			if($('.tooltip').innerWidth() > $parent.innerWidth()) {
				xCenter = offset.left - (($('.tooltip').innerWidth() / 2) - ($parent.innerWidth() / 2));
			} else if($parent.innerWidth() > $('.tooltip').innerWidth()) {
				xCenter = offset.left + ($parent.innerWidth() / 2) - ($('.tooltip').innerWidth() / 2);
			} else { // Equal
				xCenter = offset.left;
			}

			// Get Tooltip horizontal centers
			if($('.tooltip').innerHeight() > $parent.innerHeight()) {
				yCenter = offset.top - (($('.tooltip').innerHeight() / 2) - ($parent.innerHeight() / 2));
			} else if($parent.innerHeight() > $('.tooltip').innerHeight()) {
				yCenter = offset.top + ($parent.innerHeight() / 2) - ($('.tooltip').innerHeight() / 2) ;
			} else {
				yCenter = offset.top;
			}

			direction = direction || 'right' // default position right
			// Positioning Tooltip
			if(direction === 'right') {

				position.xAxis = offset.left + $parent.innerWidth() + parentOffset;
				position.yAxis = yCenter;
			
			} else if(direction === 'top') {
				// top direction is special because of the text direction (top to bottom)
				// therefore we need to get the difference of the tooltip width 
				// to prevent overlapping from the parent

				position.xAxis = xCenter;
				position.yAxis = offset.top - $('.tooltip').innerHeight() - parentOffset;

			} else if(direction === 'bottom') {
			
				position.xAxis = xCenter;
				position.yAxis = offset.top + $parent.innerHeight() + parentOffset;
			
			} else { // Left
				// left direction is special because of the text direction (left to right)
				// therefore we need to get the difference of the tooltip width 
				// to prevent overlapping from the parent

				position.xAxis = offset.left - ($('.tooltip').innerWidth() + parentOffset);
				position.yAxis = yCenter;
			}

			return position;
		};

		return this.each(function() {

			// Customizable
			var defaultOptions = {
				backgroundColor: '#8cc3f2',
				textColor: '#fff',
				fixed: false,
				fadeEffect: false,
				direction: 'right',
				padding: 5,
				offset: 5,
				fontFamily: 'sans serif'
			};

			options = $.extend(defaultOptions, options); // merge defaultOptions to options

			if(options.fixed) {
				// Fixed Settings on
				_this.on({
					mouseenter: function(e) {

						if(!mouseEnterFlag) return; // exit function

						var $self 			= $(this), // cache only if using variable more than 1 time
							$offset 		= $self.offset(),
							marktipDataAttr = $self.data(),
							attrMessage 	= marktipDataAttr['marktipTitle'],
							pos 			= {},

							// Check for data options
							realPadding = marktipDataAttr['marktipPadding'] || options.padding,
							parentOffset = marktipDataAttr['marktipOffset'] || options.offset;


						// Add Tooltip
						appendTooltip(attrMessage);

						// Apply options before positioning tooltip
						$('.tooltip').css({ 
							position: 'absolute', 
							display: 'inline-block', 
							backgroundColor: options.backgroundColor, 
							color: options.textColor,
							padding: realPadding,
							fontFamily: options.fontFamily
						});

						// Determine where to get position
						if(marktipDataAttr['marktipPosition']) {
							// Options in data attribute
							pos = initPositioning(marktipDataAttr['marktipPosition'], $offset, parentOffset, $self);
						} else {
							// Options passed Works on all .marktip
							pos = initPositioning(options.direction, $offset, parentOffset, $self);
						}

						// Applying css position
						$('.tooltip').css({ 
							top: pos.yAxis, 
							left: pos.xAxis
						});

						mouseEnterFlag = false;
					},
					mouseleave: function() {
						removeTooltip();
					}
				})
			} else {
				// Fixed Settings off
				_this.on({
					mouseenter: function() {
						if(!mouseEnterFlag) return; // exit function

						var message = $(this).data('title');
						appendTooltip(message);
						
						mouseEnterFlag = false;
					},
					mouseleave: function() {
						removeTooltip();
						mouseEnterFlag = true;
					}
				}).mousemove(function(e) {
					var $self 	= $(this),
						xCenter = ($('.tooltip').width() - $self.width()) / 2, // to spawn into the middle of tooltip in the middle of the parent vertically
						yCenter = ($('.tooltip').height() - $self.height()) / 2, // to spawn into the middle of tooltip in the middle of the parent horizontally
						xAxis, // Get X coordinates
						yAxis; // Get Y coordinates

					// Positioning Tooltip
					if(options.direction === 'left') {

						xAxis = e.pageX - $('.tooltip').width() - (options.offset + (options.padding * 2));
						yAxis = e.pageY - (yCenter + options.padding + options.offset);
					
					} else if(options.direction === 'right') {

						xAxis = e.pageX + $(this).width() - (options.offset + (options.padding * 2));
						yAxis = e.pageY - (yCenter + options.padding + options.offset);
					
					} else if(options.direction === 'top') {
						
					
					} else if(options.direction === 'bottom') {
					
					
					}

					$('.tooltip').css({ 
						top: yAxis, 
						left: xAxis, 
						position: 'absolute', 
						display: 'block', 
						backgroundColor: options.backgroundColor, 
						color: options.textColor,
						padding: options.padding
					});
				});
			}
		
		});
	}

})(jQuery);