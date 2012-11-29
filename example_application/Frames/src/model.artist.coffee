goog.provide "model.artist"

class Artist
	constructor: (name) ->
		@name = name

	getArtistImages: (artist_name, callback) ->

		_cb = callback

		_data = {}

		_img_array = []

		# Set request URL
		request = "http://ws.audioscrobbler.com/2.0/artist/" + encodeURIComponent(artist_name) + "/images.rss"

		# Using YQL, grab RSS feed of images.
		$.getJSON "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22" + encodeURIComponent(request) + "%22&format=json&callback=?", (data) ->

			# Default HTML var
			$.each data.query.results.rss.channel.item, (index, key) ->

				_img_array.push "<img src=\"" + key.content.url + "\" border=\"0\" style=\"margin-right: 10px; margin-bottom: 10px;\">"  if key.content.width <= 500

			_data.images = _img_array
			_cb.call(this, _data)  if typeof _cb is "function"
