class window.Page
	constructor: (name) ->
		@name = name
		
	setData: ->
		envelope = data:
		  title: "Welcome to FRAMES"
		  text: "I hope you enjoy it!"