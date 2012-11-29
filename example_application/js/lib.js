$(document).ready(function() {
	// Simple work on input interaction
	$("#inputArtist").bind("focus", function() {
		$(this).val("");
		$(this).css({
			"color" : "#000000"
		});
	});

	$('#inputArtist').keypress(function(e){
		if(e.which == 13){
			window.location = '#!/search/artist/name:' + $(this).val() + '/';
		}
	});
	
	$("#submitButton").bind("click", function() {
		window.location = '#!/search/artist/name:' + $('#inputArtist').val() + '/';
	});
});