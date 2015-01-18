(function() {
  var BaseView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.View.Extension = {};

  Backbone.BaseView = BaseView = Backbone.View;

  View = (function(_super) {
    __extends(View, _super);

    function View(options) {
      var extension, key, klass, _ref;
      if (options == null) {
        options = {};
      }
      this.extensions = [];
      _ref = Backbone.View.Extension;
      for (key in _ref) {
        klass = _ref[key];
        if ((this[key.toLowerCase()] != null) || klass.prototype.force) {
          extension = new klass(this, options);
          this.extensions.push(extension);
        }
      }
      BaseView.call(this, options);
    }

    View.prototype._runExtensionCallbacks = function(key, callbackArguments) {
      var extension, _i, _len, _ref, _ref1, _results;
      _ref = this.extensions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        extension = _ref[_i];
        _results.push((_ref1 = extension[key]) != null ? _ref1.apply(extension, callbackArguments) : void 0);
      }
      return _results;
    };

    return View;

  })(BaseView);

  _.each(['Initialize', 'Render', 'Remove'], function(key) {
    var afterMethod, beforeMethod, method;
    method = key.toLowerCase();
    beforeMethod = "before" + key;
    afterMethod = "after" + key;
    return View.prototype[method] = function() {
      var callbackArguments;
      callbackArguments = Array.prototype.slice.call(arguments);
      callbackArguments.unshift(this);
      if (this[beforeMethod] != null) {
        this[beforeMethod].apply(this, arguments);
      }
      this._runExtensionCallbacks(beforeMethod, callbackArguments);
      this._runExtensionCallbacks(method, callbackArguments);
      this._runExtensionCallbacks(afterMethod, callbackArguments);
      if (this[afterMethod] != null) {
        this[afterMethod].apply(this, arguments);
      }
      return BaseView.prototype[method].apply(this, arguments);
    };
  });

  Backbone.View = View;

}).call(this);
