(function() {
  var Collection2ViewBinder;

  Collection2ViewBinder = (function() {
    Collection2ViewBinder.prototype.defaults = {
      onAdd: function(model, collection, options) {
        var $template, template;
        template = this.template;
        if (_.isFunction(template)) {
          template = template(model);
        }
        $template = template instanceof Backbone.View ? template.render().$el : $(template);
        return $template.appendTo(this.$selector).data("model-cid", model.cid);
      },
      onSort: function(collection, options) {
        return collection.each((function(_this) {
          return function(model) {
            return _this.$selector.children("[data-model-cid='" + model.cid + "']").appendTo(_this.$selector);
          };
        })(this));
      },
      onReset: function(collection, options) {
        this.$selector.empty();
        return collection.each((function(_this) {
          return function(model) {
            return _this.handlers["add"](model, collection);
          };
        })(this));
      },
      onRemove: function(model, options) {
        return this.$selector.children("[data-model-cid='" + model.cid + "']").remove();
      }
    };

    function Collection2ViewBinder(collection, $el, options) {
      this.collection = arguments[0], this.$el = arguments[1];
      this.options = _.defaults(options, this.defaults);
      this.template = _.required(this.options, "template");
      this.$selector = this.$el.find(_.required(this.options, 'selector'));
    }

    Collection2ViewBinder.prototype.on = function() {
      var event, handler, key, method, _i, _len, _ref, _results;
      if (this.handlers != null) {
        this.off();
      }
      this.handlers = {};
      _ref = ['Add', 'Sort', 'Reset', 'Remove'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        event = key.toLowerCase();
        method = "on" + key;
        handler = this.options[method].bind(this);
        this.handlers[event] = handler;
        _results.push(this.collection.on(event, handler));
      }
      return _results;
    };

    Collection2ViewBinder.prototype.off = function() {
      var event, handler, _ref, _results;
      _ref = this.handlers;
      _results = [];
      for (event in _ref) {
        handler = _ref[event];
        _results.push(this.collection.off(event, handler));
      }
      return _results;
    };

    return Collection2ViewBinder;

  })();

  Backbone.View.Extension.Store = (function() {
    function Store() {}

    Store.prototype.initialize = function(options) {
      this.collection = _.required(options, "collection");
      this.binder = new Collection2ViewBinder(this.collection, this.$el, this.store);
      return this.binder.on();
    };

    Store.prototype.render = function() {
      return this.binder.handlers["reset"](this.collection);
    };

    Store.prototype.remove = function() {
      return this.binder.off();
    };

    return Store;

  })();

}).call(this);
