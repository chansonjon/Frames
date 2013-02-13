$(document).on("focus", "#inputArtist", function() {
  $(this).val("");
  $(this).css({
    color: "#000000"
  });
});

$(document).on("keypress", "#inputArtist", function(e) {
  if (e.which === 13) {
    window.location = "#!/artists/search/name:" + $(this).val() + "/";
  }
});

$(document).on("click", "#submitButton", function() {
  window.location = "#!/artists/search/name:" + $("#inputArtist").val() + "/";
});