(function() {
  var Binder, Model2ViewBinder, View2ModelBinder,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Binder = (function() {
    function Binder(model, attr, $el, options) {
      this.model = arguments[0], this.attr = arguments[1], this.$el = arguments[2];
      this.options = _.defaults(options, this.defaults);
      this.selector = _.required(options, 'selector');
    }

    return Binder;

  })();

  View2ModelBinder = (function(_super) {
    __extends(View2ModelBinder, _super);

    View2ModelBinder.prototype.defaults = {
      event: "change",
      accessor: "val",
      reverse: true,
      onSet: function($el, model, attr, event) {
        var accessor, value;
        accessor = this.options.accessor;
        if (_.isString(accessor)) {
          accessor = $el[accessor];
        }
        value = accessor.call($el);
        return model.set(attr, value);
      }
    };

    function View2ModelBinder() {
      View2ModelBinder.__super__.constructor.apply(this, arguments);
      if (this.options.reverse) {
        this.reverse = new Model2ViewBinder(this.model, this.attribute, this.$el, this.options);
      }
    }

    View2ModelBinder.prototype.on = function() {
      if (this.handler != null) {
        this.off();
      }
      this.handler = (function(_this) {
        return function(event) {
          var $selector;
          if (_this.reverse) {
            _this.reverse._pending = true;
          }
          $selector = _this.$el.find(_this.selector);
          return _this.options.onSet.call(_this, $selector, _this.model, _this.attr, event);
        };
      })(this);
      this.$el.on(this.options.event, this.selector, this.handler);
      if (this.reverse) {
        return this.reverse.on();
      }
    };

    View2ModelBinder.prototype.off = function() {
      this.$el.off(this.options.event, this.selector, this.handler);
      if (this.reverse) {
        return this.reverse.off();
      }
    };

    return View2ModelBinder;

  })(Binder);

  Model2ViewBinder = (function(_super) {
    __extends(Model2ViewBinder, _super);

    function Model2ViewBinder() {
      return Model2ViewBinder.__super__.constructor.apply(this, arguments);
    }

    Model2ViewBinder.prototype.defaults = {
      accessor: "text",
      onGet: function($el, model, attr, value) {
        var accessor;
        accessor = this.options.accessor;
        if (_.isString(accessor)) {
          accessor = $el[accessor];
        }
        return accessor.call($el, value);
      }
    };

    Model2ViewBinder.prototype.on = function() {
      if (this.handler != null) {
        this.off();
      }
      this.handler = (function(_this) {
        return function(model, value) {
          var $selector;
          if (_this._pending) {
            return _this._pending = false;
          }
          $selector = _this.$el.find(_this.selector);
          return _this.options.onGet.call(_this, $selector, model, _this.attr, value);
        };
      })(this);
      return this.model.on("change:" + this.attr, this.handler);
    };

    Model2ViewBinder.prototype.off = function() {
      return this.model.off("change:" + this.attr, this.handler);
    };

    return Model2ViewBinder;

  })(Binder);

  Backbone.View.Extension.Bindings = (function() {
    function Bindings() {}

    Bindings.prototype.initialize = function(view, options) {
      var $selector, attribute, binder, binding, bindings, model, tag, _ref, _results;
      if (view.model) {
        model = view.model;
        if (_.isFunction(model)) {
          model = model(options);
        }
      } else {
        model = _.required(options, "model");
      }
      view.binders = [];
      _ref = view.bindings;
      _results = [];
      for (attribute in _ref) {
        bindings = _ref[attribute];
        bindings = _.isArray(bindings) ? bindings : [bindings];
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = bindings.length; _i < _len; _i++) {
            binding = bindings[_i];
            if (_.isString(binding)) {
              binding = {
                selector: binding
              };
            }
            $selector = view.$(_.required(binding, 'selector'));
            tag = $selector.attr("tagName").toLowerCase();
            if (/input|textarea/.test(tag) || binding.event) {
              binder = new View2ModelBinder(model, attribute, view.$el, binding);
            } else {
              binder = new Model2ViewBinder(model, attribute, view.$el, binding);
            }
            binder.on();
            _results1.push(view.binders.push(binder));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Bindings.prototype.remove = function(view) {
      var binder, _i, _len, _ref, _results;
      _ref = view.binders;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binder = _ref[_i];
        _results.push(binder.off());
      }
      return _results;
    };

    return Bindings;

  })();

}).call(this);
