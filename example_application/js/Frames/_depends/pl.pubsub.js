window.topics = {};

$.PubSub = function(id) {
  var callbacks, topic;
  callbacks = void 0;
  topic = id && window.topics[id];
  if (!topic) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if (id) {
      window.topics[id] = topic;
    }
  }
  return topic;
};