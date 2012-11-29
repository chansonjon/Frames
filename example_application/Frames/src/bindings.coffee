goog.provide "bindings"

$(document).on "focus", "#inputArtist", ->
  $(this).val ""
  $(this).css color: "#000000"

$(document).on "keypress", "#inputArtist", (e) ->
  window.location = "#!/artists/search/name:" + $(this).val() + "/"  if e.which is 13

$(document).on "click", "#submitButton", ->
  window.location = "#!/artists/search/name:" + $("#inputArtist").val() + "/"
