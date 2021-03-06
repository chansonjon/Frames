(function($) {
  var fnCheckLocation, fnCleanHash, intIntervalTime, strHash, strLocation, strPrevHash, strPrevLocation;
  strLocation = window.location.href;
  strHash = window.location.hash;
  strPrevLocation = "";
  strPrevHash = "";
  intIntervalTime = 100;
  fnCleanHash = function(strHash) {
    return strHash.substring(1, strHash.length);
  };
  fnCheckLocation = function() {
    if (strLocation !== window.location.href) {
      strPrevLocation = strLocation;
      strPrevHash = strHash;
      strLocation = window.location.href;
      strHash = window.location.hash;
      return $(window.location).trigger("change", {
        currentHref: strLocation,
        currentHash: fnCleanHash(strHash),
        previousHref: strPrevLocation,
        previousHash: fnCleanHash(strPrevHash)
      });
    }
  };
  return setInterval(fnCheckLocation, intIntervalTime);
})(jQuery);