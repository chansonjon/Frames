

FRAMES.helpers = {
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	slug: function(str) {
		var from, i, l, to;
		str = str.replace(/^\s+|\s+$/g, "");
		from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
		to = "aaaaaeeeeeiiiiooooouuuunc------";
		i = 0;
		l = from.length;
		while (i < l) {
			str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
			i++;
		}
		str = str.replace(/[^A-Za-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
		return str;
	},
	presentLoader: function() {
		var htmlStr, opts, target, wH, wW;
		wH = $(window).outerHeight(true);
		wW = $(window).outerWidth(true);
		if ($("#frames-loader").length === 0) {
			htmlStr = "<div id =\"frames-loader\"></div>";
			$("body").append(htmlStr);
		}
		$("#frames-loader").css({
			padding: "10px",
			background: "#000",
			color: "#FFF",
			width: 100,
			height: 100,
			"text-align": "center",
			position: "absolute",
			top: wH / 2 - 60,
			left: wW / 2 - 60,
			"z-index": 2000,
			display: "none",
			"border-radius": "10px"
		}, opts = {
			lines: 7,
			length: 7,
			width: 2,
			radius: 6,
			corners: 1,
			rotate: 50,
			color: "#FFF",
			speed: 1,
			trail: 56,
			shadow: false,
			hwaccel: false,
			className: "spinner",
			zIndex: 2e9,
			top: "auto",
			left: "auto"
		});
		$("#frames-loader").show();
		target = document.getElementById("frames-loader");
		if (this.spinner == null) {
			return this.spinner = new Spinner(opts).spin(target);
		}
	},
	hideLoader: function() {
		return $("#frames-loader").hide();
	}
};
