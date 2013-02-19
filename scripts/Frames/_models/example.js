var Example;

Example = (function() {
	
	function Example(name) {
		
		this.name = name;
		
	}
	
	Example.prototype.getImages = function(cb) {
		
		var _envelope;
		
		var _flickrRSS = 'http://api.flickr.com/services/feeds/photos_public.gne?id=41926543@N05&lang=en-us&format=rss_200';
		
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22' + encodeURIComponent(_flickrRSS) + '%22&format=json',
			dataType: 'jsonp',
			success: function(res) {
				var _response, _images;
				_response = res.query.results.rss.channel.item;
				_images = [];
				$.each(_response, function(i,o) {
					_images.push(o.content.url);
				});
				_envelope = {
					data: {
						images: _images
					}
				}
				cb.call(this, _envelope);
			}
		});
		
	}
	
	Example.prototype.preLoadImages = function(files, cb) {
		var i, img, _count, _counter, _interval;
		
		console.log(files);

		_count = files.length;

		_counter = 0;

		i = 0;

		while (i < files.length) {
		  img = new Image();
		  img.src = files[i];
		  $(img).load(function() {
		    return _counter++;
		  });
		  i++;
		}

		_interval = setInterval(function() {
		  if (_count === _counter) {
		    clearInterval(_interval);
		    return cb();
		  }
		}, 50);
	}
	
	return Example;
	
})();