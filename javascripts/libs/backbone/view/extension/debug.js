(function() {
  var key;

  key = function(view) {
    return "" + view.cid + "(" + view.constructor.name + ")";
  };

  Backbone.View.Extension.Debug = (function() {
    function Debug() {}

    Debug.prototype.force = true;

    Debug.prototype.beforeInitialize = function(view) {
      _.debug("Create new Backbone.View: " + (key(view)));
      return _.time("Create " + (key(view)));
    };

    Debug.prototype.afterRender = function(view) {
      _.debug("Render Backbone.View: " + (key(view)));
      return _.timeEnd("Create " + (key(view)));
    };

    Debug.prototype.beforeRemove = function(view) {
      return _.debug("Remove Backbone.View: " + (key(view)));
    };

    return Debug;

  })();

}).call(this);
