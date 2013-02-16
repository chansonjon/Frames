var Pages;

Pages = (function() {
	
	// Init the model
	Pages.prototype.page = null;
	
	// Constructor
	function Pages(name) {
		
		// Set the name property
		this.name = name;
		
		// Construct an instance of the Page Model
		if (Page && this.page === null) {
			this.page = new Page("Page");
		}
		
	}
	
	Pages.prototype.welcome = function(args) {
		
		// Render the view passing data
		FRAMES.core.renderView({
			compile: false
		});
		
	}
	
	// Return instance
	return Pages;
	
})();