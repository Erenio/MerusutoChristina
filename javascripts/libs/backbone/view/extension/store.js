(function() {
  var Collection2ViewBinder;

  Collection2ViewBinder = (function() {
    Collection2ViewBinder.prototype.defaults = {
      onAdd: function(model, collection, options) {
        var $template, template;
        template = this.template;
        if (_.isFunction(template)) {
          template = template({
            model: model,
            collection: collection
          });
        }
        if (template instanceof Backbone.View) {
          $template = template.render().$el;
        } else {
          $template = template = $(template);
        }
        $template.appendTo(this.$selector);
        return this.views[model.cid] = template;
      },
      onSort: function(collection, options) {
        var $template, model, _i, _len, _ref, _results;
        _ref = collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          $template = this.views[model.cid];
          if ($template.$el != null) {
            $template = $template.$el;
          }
          _results.push($template.appendTo(this.$selector));
        }
        return _results;
      },
      onReset: function(collection, options) {
        var $template, cid, model, _i, _len, _ref, _ref1, _results;
        _ref = this.views;
        for (cid in _ref) {
          $template = _ref[cid];
          $template.remove();
          delete this.views[cid];
        }
        _ref1 = collection.models;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          model = _ref1[_i];
          _results.push(this.add(model, collection));
        }
        return _results;
      },
      onRemove: function(model, options) {
        this.views[model.cid].remove();
        return delete this.views[model.cid];
      },
      onFilter: function(attributes) {
        var eachTemplate;
        eachTemplate = (function(_this) {
          return function(collection, callback) {
            var $template, model, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = collection.length; _i < _len; _i++) {
              model = collection[_i];
              $template = _this.views[model.cid];
              if ($template.$el != null) {
                $template = $template.$el;
              }
              _results.push(callback($template));
            }
            return _results;
          };
        })(this);
        if (attributes != null) {
          eachTemplate(this.collection.models, function($template) {
            return $template.hide();
          });
          return eachTemplate(this.collection.where(attributes), function($template) {
            return $template.show();
          });
        } else {
          return eachTemplate(this.collection.models, function($template) {
            return $template.show();
          });
        }
      }
    };

    function Collection2ViewBinder(collection, $el, options) {
      this.collection = arguments[0], this.$el = arguments[1];
      this.options = _.defaults(options, this.defaults);
      this.template = _.required(this.options, "template");
      this.$selector = this.$el.find(_.required(this.options, 'selector'));
      this.views = {};
    }

    Collection2ViewBinder.prototype.on = function() {
      var event, handler, key, method, _i, _len, _ref;
      if (this.handlers != null) {
        this.off();
      }
      this.handlers = {};
      _ref = ['Add', 'Sort', 'Reset', 'Remove'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        event = key.toLowerCase();
        method = "on" + key;
        handler = this.options[method].bind(this);
        this.handlers[event] = handler;
        this.collection.on(event, handler);
      }
      return this.handlers['filter'] = this.options['onFilter'].bind(this);
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

    Collection2ViewBinder.prototype.add = function(model) {
      return this.handlers["add"](model, this.collection);
    };

    Collection2ViewBinder.prototype.remove = function(model) {
      return this.handlers["remove"](model);
    };

    Collection2ViewBinder.prototype.reset = function(collection) {
      if (collection == null) {
        collection = this.collection;
      }
      return this.handlers["reset"](collection);
    };

    Collection2ViewBinder.prototype.filter = function(attributes) {
      if (!((attributes != null) && Object.keys(attributes).length !== 0)) {
        attributes = void 0;
      }
      return this.handlers["filter"](attributes);
    };

    Collection2ViewBinder.prototype.sort = function(comparator) {
      this.collection.comparator = comparator;
      return this.collection.sort();
    };

    return Collection2ViewBinder;

  })();

  Backbone.View.Extension.Store = (function() {
    function Store() {}

    Store.prototype.initialize = function(view, options) {
      var collection;
      if (view.collection) {
        collection = view.collection;
        if (_.isFunction(collection)) {
          collection = collection(options);
        }
      } else {
        collection = _.required(options, "collection");
      }
      view.binder = new Collection2ViewBinder(collection, view.$el, view.store);
      return view.binder.on();
    };

    Store.prototype.render = function(view) {
      return view.binder.reset();
    };

    Store.prototype.remove = function(view) {
      return view.binder.off();
    };

    return Store;

  })();

}).call(this);
