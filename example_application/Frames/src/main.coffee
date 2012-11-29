###
main.coffee - Primary entry point
###

# Make sure this matches up with your project namespace in package.json
goog.provide "FRAMES"   

# Include other files
goog.require "FRAMES.dependencies"
goog.require "FRAMES.location"
goog.require "FRAMES.core"
goog.require "FRAMES.helpers"

goog.require "bindings"

goog.require "controller.artists"
goog.require "model.artist"

$(document).ready ->
	FRAMES.core.parseURL()

$(window.location).bind "change", ->
  FRAMES.core.parseURL()