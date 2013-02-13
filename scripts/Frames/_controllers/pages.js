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
		
		// Set some data as an example
		var _data = this.page.setData();
		
		// Render the view passing data
		FRAMES.core.renderView(_data);
		
	}
	
	// Return instance
	return Pages;
	
})();