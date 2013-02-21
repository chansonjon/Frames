class window.Page
	constructor: (name) ->
		# Name object.
		@name = name
		
	setData: ->
		# Set and return envelope object.
		envelope = data:
		  title: "Welcome to FRAMES"
		  text: "I hope you enjoy it!"