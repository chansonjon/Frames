goog.provide "FRAMES.controller.pages"

class Pages
	page: null
	constructor: (name) ->

		# Name the object
		@name = name

		# Construct the model object
		@page = new Page("Page")  if Page and @page is null

	index: (args) ->
		
		# Set data
		_data = @page.setData()

		# Render the view
		FRAMES.core.renderView _data

	about: (args) ->
		
		# Set data
		_data = @page.setData()

		# Render the view
		FRAMES.core.renderView _data