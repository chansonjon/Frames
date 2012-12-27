goog.provide "FRAMES.core"

FRAMES.core = 
	core_objects: []

	parseURL: ->

		FRAMES_DEFAULTS = FRAMES_DEFAULTS || {}

		_obj = @

		# Break up URL and create an Array
		_loc = $(location).attr("hash")
		_loc = _loc.replace(/#!\//g, "") #Remove the hash/bang (#!/)
		_loc = _loc.replace(/(\s+)?.$/, "")  if _loc.substring(_loc.length - 1, _loc.length) is "/" #Remove trailing "/" to avoide undefined key in the object
		_loc = _loc.replace(/\//g, ",")
		_loc = _loc.split(",")
		_argument_array = {}
		$.each _loc, (index, key) ->
		  if index > 1
		    _tmp_key = key.replace(/:/g, ",").split(",")[0]
		    _tmp_value = key.replace(/:/g, ",").split(",")[1]
		    _argument_array[_tmp_key] = _tmp_value

		# Set ROUTE model keys
		@controller = _loc[0]
		@action = _loc[1]
		@arguments = _argument_array

		# If welcome
		unless $.isEmptyObject FRAMES_DEFAULTS
			# and no controller is passed.
			if @controller is ""
				@controller = FRAMES_DEFAULTS.controller
				@action = FRAMES_DEFAULTS.action

		# If no action is passed, default to the index method
		@action = "index"  unless @action

		# console.log @controller

		# Init()
		loaded = setInterval(->
			if typeof Handlebars isnt "undefined"
				clearInterval loaded
				_obj.runFrame()  unless _obj.controller is ""
		, 100)
		


	runFrame: -> 

		unless @isConstructed()

			try
			  # Construct the controller Object
				@current_controller = eval("new " + FRAMES.helpers.capitalizeFirstLetter(@controller))

				# Push the reference to the controllers array
				@core_objects.push @current_controller

				# Set the name
				@current_controller.name = @controller

				# Set a local reference to the controller object
				_controller = @current_controller
				_arguments = @arguments

				#Invoke the action using eval
				str = "_controller." + @action + "(_arguments)"
				eval str

			catch err
			  @error err

		else
			try
				# Local reference to the controller boject
				_controller = @current_controller
				_arguments = @arguments

				# Invoke
				str = "_controller." + @action + "(_arguments)"
				eval str
			catch err
				@error err

	isConstructed: ->
		_found = false
		_i = 0

		while _i < @core_objects.length
		  if @core_objects[_i].name is @controller
		    _found = true
		  _i++

		_found

	error: (err) ->

		obj = @

		loaded = setInterval(->
			if typeof Handlebars isnt "undefined"
				clearInterval loaded

				# body
				_body = $("body")

			
				data = {
					title: "Frames Error"
					message: err.message
					stack: err.stack
				}

				#log it to the console
				console.error err.stack
					

				$.ajax
					url: "FRAMES/views/_frames_error.html"
					dataType: "html"
					success: (res) ->
						_body.html res
						_body.prepend "<div id='yield'></div>"

						source   = $("#_frames_error").html();
						template = Handlebars.compile(source);
						$("#yield").append(template(data));

						$(".frames_message").css
							"color": "#b94a48"
							"background-color": "#f2dede"
							"border-color": "#eed3d7"
							"padding": "20px"

						$("pre").css
							"background-color": "#f7f7f9"
							"border": "1px solid #e1e1e8"
							"padding": "20px"

					error: (x,y,z) ->
						console.log x
						console.log y
						console.log z
		, 100)

	renderView: (data) ->

		_body = $("body")
		_yield = $("#yield")
		_view = "FRAMES/views/_" + @controller + "_" + @action + ".html"
		_id = "_" + @controller + "_" + @action

		# Assure Handlebar view is only added one time.
		if $("#" + _id).length is 0
			$.ajax
				url: _view
				dataType: "html"
				success: (res) ->
					_body.append res
					_yield.empty()
					_source = $("#" + _id).html()
					_template = Handlebars.compile(_source)
					_yield.append(_template(data))
		else
			_yield.empty()
			_source = $("#" + _id).html()
			_template = Handlebars.compile(_source)
			_yield.append(_template(data))

		












