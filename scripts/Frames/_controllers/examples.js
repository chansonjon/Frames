var Examples;

Examples = (function() {
	
	function Examples(name) {
		
		// Set the name property
		this.name = name;
		
		this.example = new Example("Example");
		
	}
	
	Examples.prototype.masonry = function (args) {
		
		var _this = this;
		
		// Call Flickr
		_this.example.getImages(function(_data) {
			
			// Render the view
			FRAMES.core.renderView(_data);
			
			_this.example.preLoadImages(_data.data.images, _this.print);
		});
		
	}
	
	Examples.prototype.print = function() {
		
		$("#yield").isotope({
			itemSelector: '.tile',
			masonry: {
				columnWidth: 4
			}
		});
		
	}
	
	return Examples;
	
})();