class window.Pages
	constructor: (name) ->
		@name = name
		@page = new Page("page")  if Page?
		
	welcome: ->
		_data = this.page.setData()
		FRAMES.core.renderView _data
		
	