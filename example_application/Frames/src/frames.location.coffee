goog.provide "FRAMES.location"

# Our plugin will be defined within an immediately
# executed method.
(($) ->
  
  # Default to the current location.
  strLocation = window.location.href
  strHash = window.location.hash
  strPrevLocation = ""
  strPrevHash = ""
  
  # This is how often we will be checkint for
  # changes on the location.
  intIntervalTime = 100
  
  # This method removes the pound from the hash.
  fnCleanHash = (strHash) ->
    strHash.substring 1, strHash.length

  
  # This will be the method that we use to check
  # changes in the window location.
  fnCheckLocation = ->
    
    # Check to see if the location has changed.
    unless strLocation is window.location.href
      
      # Store the new and previous locations.
      strPrevLocation = strLocation
      strPrevHash = strHash
      strLocation = window.location.href
      strHash = window.location.hash
      
      # The location has changed. Trigger a
      # change event on the location object,
      # passing in the current and previous
      # location values.
      $(window.location).trigger "change",
        currentHref: strLocation
        currentHash: fnCleanHash(strHash)
        previousHref: strPrevLocation
        previousHash: fnCleanHash(strPrevHash)


  
  # Set an interval to check the location changes.
  setInterval fnCheckLocation, intIntervalTime
) jQuery