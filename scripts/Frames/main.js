/*************************************************************************************
 * REMOVE THIS IN PRODUCTION. OR DON'T.
*/

require.config({
    urlArgs: "v=" + (new Date()).getTime()
});

$.ajaxSetup({
	cache: false
});

/*************************************************************************************
 * LOVE IT OR HATE IT, HERES THE FRAMES GLOBAL NAMESPACE
*/

var FRAMES = {
	defaults: {
		controller: "pages",
		action: "welcome"
	},
	depends: [
		"_depends/pl.location",
		"_depends/pl.handlebars",
		"_depends/pl.underscore",
		"_depends/pl.pubsub",
		"_depends/pl.spin",
		"_depends/frames.helpers",
		"_depends/frames.core"
	],
	controllers: [
		"cs!_controllers/pages"
	],
	models: [
		"cs!_models/page"
	],
	vendors: [
	
	]
}

/*************************************************************************************
 * PUSH THE CONTROLLER, MODELS AND VENDOR ARRAYS INTO A NEW ARRAY
*/

var __require = FRAMES.depends.concat(FRAMES.controllers,FRAMES.models,FRAMES.vendors);

/*************************************************************************************
 * INIT REQUIREJS WITH REQUIRE DEPENDS
*/

require(__require, function() {
	// Init some FRAMES 
	FRAMES.core.parseURL()
});

/*************************************************************************************
 * HASH CHANGE LISTENER
*/

$(window.location).bind("change", function() {
	FRAMES.core.parseURL();
});