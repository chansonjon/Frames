FRAMES.core = {
	core_objects: [],
	base_path: null,
	parseURL: function () {
		var loaded, _argument_array, _loc, _obj, _this;

		_this = this;

		if (!_this.base_path) {
			(function (name) {
				var scripts = document.getElementsByTagName('script');

				for (var i = scripts.length - 1; i >= 0; --i) {
					var src = scripts[i].src;
					var l = src.length;
					var length = name.length;
					if (src.substr(l - length) == name) {
						// set a global propery here
						_this.base_path = src.substr(0, l - length);
					}
				}
				})('main.js');
			}

			window.scrollTo(0, 0);

			_obj = this;
			FRAMES.defaults = FRAMES.defaults || {};
			_loc = $(location).attr("hash");
			_loc = _loc.replace(/#!\//g, "");
			if (_loc.substring(_loc.length - 1, _loc.length) === "/") {
				_loc = _loc.replace(/(\s+)?.$/, "");
			}
			_loc = _loc.replace(/\//g, ",");
			_loc = _loc.split(",");
			_argument_array = {};
			$.each(_loc, function (index, key) {
				var _tmp_key, _tmp_value;
				if (index > 1) {
					_tmp_key = key.replace(/:/g, ",").split(",")[0];
					_tmp_value = key.replace(/:/g, ",").split(",")[1];
					return _argument_array[_tmp_key] = _tmp_value;
				}
			});
			this.controller = _loc[0];
			this.action = _loc[1];
			this["arguments"] = _argument_array;

			if (this.controller && this.action) {
				FRAMES.helpers.presentLoader();
			}

			if (!$.isEmptyObject(FRAMES.defaults)) {
				if (this.controller === "") {
					this.controller = FRAMES.defaults.controller;
					this.action = FRAMES.defaults.action;
				}
			}
			if (!this.action) {
				this.action = "index";
			}
			return loaded = setInterval(function () {
				if (typeof Handlebars !== "undefined") {
					clearInterval(loaded);
					if (_obj.controller !== "") {
						return _obj.runFrame();
					}
				}
				}, 100);
			},
			runFrame: function () {
				var str, _arguments, _controller;

				if (!this.isConstructed()) {

					try {
						this.current_controller = eval("new " + FRAMES.helpers.capitalizeFirstLetter(this.controller));
						this.core_objects.push(this.current_controller);
						this.current_controller.name = this.controller;
						_controller = this.current_controller;
						_arguments = this["arguments"];
						str = "_controller." + this.action + "(_arguments)";
						return eval(str);
					} catch (err) {
						return this.error(err);
					}
				} else {
					try {
						_controller = this.current_controller;
						_arguments = this["arguments"];
						str = "_controller." + this.action + "(_arguments)";
						return eval(str);
					} catch (err) {
						return this.error(err);
					}
				}
			},
			isConstructed: function () {
				var _found, _i;
				_found = false;
				_i = 0;
				while (_i < this.core_objects.length) {
					if (this.core_objects[_i].name === this.controller) {
						_found = true;
					}
					_i++;
				}
				return _found;
			},
			error: function (err) {
				var loaded, obj;
				obj = this;
				return loaded = setInterval(function () {
					var data, _body;
					if (typeof Handlebars !== "undefined") {
						clearInterval(loaded);
						_body = $("body");
						data = {
							title: "Frames Error",
							message: err.message,
							stack: err.stack
						};
						console.error(err.stack);
						return $.ajax({
							url: FRAMES.core.base_path + "_views/_frames_error.html",
							dataType: "html",
							success: function (res) {
								var source, template;
								_body.html(res);
								_body.prepend("<div id='yield'></div>");
								source = $("#_frames_error").html();
								template = Handlebars.compile(source);
								$("#yield").append(template(data));
								$(".frames_message").css({
									"color": "#b94a48",
									"background-color": "#f2dede",
									"border-color": "#eed3d7",
									"padding": "20px"
								});
								return $("pre").css({
									"background-color": "#f7f7f9",
									"border": "1px solid #e1e1e8",
									"padding": "20px"
								});
							},
							error: function (x, y, z) {
								console.log(x);
								console.log(y);
								return console.log(z);
							}
						});
					}
					}, 100);
				},
				renderView: function (options) {
					var _body, _id, _source, _template, _view, _yield, _cb, _append;
					_cb = options.callback || null;
					_body = $("body");
					_yield = (options.renderTo) ? $(options.renderTo) : $("#yield");
					_append = (options.append) ? options.append : false;
					_view = FRAMES.core.base_path + "_views/_" + this.controller + "_" + this.action + ".html";
					_id = "_" + this.controller + "_" + this.action;
					if ($("#" + _id).length === 0) {
						$.ajax({
							url: _view,
							dataType: "html",
							success: function (res) {
								var _source, _template;
								_body.append(res);
								_yield.empty();
								_source = $("#" + _id).html();
								_template = Handlebars.compile(_source);
								_test = Handlebars.precompile(_source);
								_yield.append(_template(options.data));
								FRAMES.helpers.hideLoader();
								
								if (typeof _cb == "function") { _cb(); }
								
								return false;
							}
						});
					} else {
						if (!_append) {
							_yield.empty();
						}
						_source = $("#" + _id).html();
						_template = Handlebars.compile(_source);
						_yield.append(_template(options.data));
						FRAMES.helpers.hideLoader();
						
						if (typeof _cb == "function") { _cb.call(this, _yield); }
						return false;
					}
				}
};