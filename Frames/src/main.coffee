###
main.coffee - Primary entry point
###

# Make sure this matches up with your project namespace in package.json
goog.provide "FRAMES"

# Include other files
goog.require "FRAMES.dependencies"
goog.require "FRAMES.location"
goog.require "FRAMES.controller.pages"
goog.require "FRAMES.model.page"
goog.require "FRAMES.core"
goog.require "FRAMES.helpers"

$(document).ready ->
	FRAMES.core.parseURL()

$(window.location).bind "change", ->
  FRAMES.core.parseURL()