// Generated by CoffeeScript 1.4.0
var Page;

goog.provide("FRAMES.model.page");

Page = (function() {

  function Page(name) {
    this.name = name;
  }

  Page.prototype.setData = function() {
    var data;
    data = {
      data: "This is the " + FRAMES.core.action + " page."
    };
    return data;
  };

  return Page;

})();