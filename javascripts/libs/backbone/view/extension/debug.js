(function() {
  var key;

  key = function(view) {
    return "" + view.cid + "(" + view.constructor.name + ")";
  };

  Backbone.View.Extension.Debug = (function() {
    function Debug() {}

    Debug.prototype.force = true;

    Debug.prototype.beforeInitialize = function(options) {
      _.debug("Create new Backbone.View: " + (key(this)));
      return _.time("Create " + (key(this)));
    };

    Debug.prototype.afterRender = function() {
      _.debug("Render Backbone.View: " + (key(this)));
      return _.timeEnd("Create " + (key(this)));
    };

    Debug.prototype.beforeRemove = function() {
      return _.debug("Remove Backbone.View: " + (key(this)));
    };

    return Debug;

  })();

}).call(this);
