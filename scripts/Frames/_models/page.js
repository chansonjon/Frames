var Page;

Page = (function() {
	
	function Page(name) {
		this.name = name;
	}
	
	Page.prototype.setData = function() {
		
		return {
			title: "Welcome to FRAMES",
			text: "I hope you enjoy it!"
		}
		
	}
	
	return Page;
	
})();