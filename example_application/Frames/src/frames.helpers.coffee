goog.provide "FRAMES.helpers"

FRAMES.helpers =

  capitalizeFirstLetter: (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)
