goog.provide "FRAMES.helpers"

FRAMES.helpers =

  capitalizeFirstLetter: (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

   slug: (str) ->
    
   	str = str.replace(/^\s+|\s+$/g, "")

   	from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
   	to = "aaaaaeeeeeiiiiooooouuuunc------"
   	i = 0
   	l = from.length

   	while i < l
   		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
   		i++

   	str = str.replace(/[^A-Za-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")

   	str

  presentLoader: ->

    wH = $(window).outerHeight(true)
    wW = $(window).outerWidth(true)
    if $("#frames-loader").length is 0
      htmlStr = "<div id =\"frames-loader\"></div>"
      $("body").append htmlStr
      
    $("#frames-loader").css
      padding: "10px"
      background: "#000"
      color: "#FFF"
      width: 100
      height: 100
      "text-align": "center"
      position: "absolute"
      top: wH / 2 - 60
      left: wW / 2 - 60
      "z-index": 2000
      display: "none"
      "border-radius": "10px"

      opts =
        lines: 7 # The number of lines to draw
        length: 7 # The length of each line
        width: 2 # The line thickness
        radius: 6 # The radius of the inner circle
        corners: 1 # Corner roundness (0..1)
        rotate: 50 # The rotation offset
        color: "#FFF" # #rgb or #rrggbb
        speed: 1 # Rounds per second
        trail: 56 # Afterglow percentage
        shadow: false # Whether to render a shadow
        hwaccel: false # Whether to use hardware acceleration
        className: "spinner" # The CSS class to assign to the spinner
        zIndex: 2e9 # The z-index (defaults to 2000000000)
        top: "auto" # Top position relative to parent in px
        left: "auto" # Left position relative to parent in px
    $("#frames-loader").show()
    target = document.getElementById("frames-loader")
    @spinner = new Spinner(opts).spin(target)  unless @spinner?

  hideLoader: ->
    $("#frames-loader").hide()

