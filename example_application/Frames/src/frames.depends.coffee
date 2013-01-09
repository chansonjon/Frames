goog.provide "FRAMES.dependencies"

###
  For any script that can't be converted to coffeescript and needs to be outside the closure compiler. Load it here.
  Or for any file you havnen't had time to convert to coffeescript to be included in the compiler at a later time.
###

(($)->

  js_array = [
    goog.basePath + "frames_depends/handlebars.js"
    goog.basePath + "frames_depends/underscore.js"
    goog.basePath + "frames_depends/spin.js"
  ]
  
  $.each js_array, (i, o) -> 
    script = document.createElement("script")
    script.type = "text/javascript"
    script.src = o
    $("head").append script

    if i is js_array.length
      $.PubSub('dependsFinished').publish()
)(jQuery)