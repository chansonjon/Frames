goog.provide "FRAMES.pubsub"

window.topics = {}
$.PubSub = (id) ->
  callbacks = undefined
  topic = id and window.topics[id]
  unless topic
    callbacks = jQuery.Callbacks()
    topic =
      publish: callbacks.fire
      subscribe: callbacks.add
      unsubscribe: callbacks.remove

    window.topics[id] = topic  if id
  topic

