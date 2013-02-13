var Artists;

Artists = (function() {
	
	// Model pointer
	Artists.prototype.artist = null;
	
	// Constructor
	function Artists(name) {
		
		// Set name
		this.name = name;
		
		// If the model object hasn't been constructed, construct it.
		if (Artist && this.artist === null) {
			this.artist = new Artist("Search");
		}
	}
	
	// Search action
	Artists.prototype.search = function(args) {
		
		// Call the getArtistImages method on the Model passing the artist name.
		this.artist.getArtistImages(args.name, function(data) {
			
			// When the data comes back, render the view.
			FRAMES.core.renderView(data);
		});
	};

	return Artists;

})();