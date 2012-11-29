goog.provide "controller.artists"

class Artists
	artist: null
	constructor: (name) ->

		# Name the object
		@name = name

		# Construct the model object
		@artist = new Artist("Search")  if Artist and @artist is null

	search: (args) ->
		
		# Set data
		@artist.getArtistImages args.name, (data) ->

			# Render the view
			FRAMES.core.renderView data