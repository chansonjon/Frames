class window.Pages
	constructor: (name) ->
		# Name object.
		@name = name
		# Construct the corresponding model if exists.
		@page = new Page("page")  if Page?
		
	welcome: ->
		# Set data.
		_data = this.page.setData()
		# Pass data to view and render.
		FRAMES.core.renderView _data
		
	