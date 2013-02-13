var Artist;

Artist = (function() {
	
	// Constructor
  function Artist(name) {
    this.name = name;
  }
	
	// getArtistImages method
  Artist.prototype.getArtistImages = function(artist_name, callback) {
    var request, _cb, _data, _img_array;
    _cb = callback;
    _data = {};
    _img_array = [];
    request = "http://ws.audioscrobbler.com/2.0/artist/" + encodeURIComponent(artist_name) + "/images.rss";
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22" + encodeURIComponent(request) + "%22&format=json&callback=?", function(data) {
      $.each(data.query.results.rss.channel.item, function(index, key) {
        if (key.content.width <= 500) {
          _img_array.push("<img src=\"" + key.content.url + "\" border=\"0\" style=\"margin-right: 10px; margin-bottom: 10px;\">");
        }
      });
      _data.images = _img_array;
      if (typeof _cb === "function") {
        _cb.call(this, _data);
      }
    });
  };

  return Artist;

})();