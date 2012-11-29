goog.provide "FRAMES.model.page"

class Page
	constructor: (name) ->
		@name = name

	setData: ->

		# Set the data object
		data = {
			data: "This is the " + FRAMES.core.action + " page."
		}

		# Return the data object
		data