(function() {
  var Collection2ViewBinder;

  Collection2ViewBinder = (function() {
    Collection2ViewBinder.prototype.defaults = {
      onAdd: function(model, collection, options) {
        var template, templateOptions;
        template = this.template;
        if (_.isFunction(template)) {
          templateOptions = {
            model: model,
            collection: collection,
            parent: this.view
          };
          if (template.name !== "") {
            template = new template(templateOptions).render();
          } else {
            template = template(templateOptions);
            template = new Backbone.Template({
              el: template
            });
          }
        } else {
          template = new Backbone.Template({
            el: template
          });
        }
        template.$el.appendTo(this.$selector);
        return this.views[model.cid] = template;
      },
      onSort: function(collection, options) {
        var model, template, _i, _len, _ref, _results;
        _ref = collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          template = this.views[model.cid];
          _results.push(template.$el.appendTo(this.$selector));
        }
        return _results;
      },
      onReset: function(collection, options) {
        var cid, model, template, _i, _len, _ref, _ref1, _results;
        _ref = this.views;
        for (cid in _ref) {
          template = _ref[cid];
          this.remove({
            cid: cid
          });
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
            var model, template, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = collection.length; _i < _len; _i++) {
              model = collection[_i];
              template = _this.views[model.cid];
              _results.push(callback(template.$el));
            }
            return _results;
          };
        })(this);
        if (attributes != null) {
          eachTemplate(this.collection.models, function(template) {
            return template.hide();
          });
          return eachTemplate(this.collection.where(attributes), function(template) {
            return template.show();
          });
        } else {
          return eachTemplate(this.collection.models, function(template) {
            return template.show();
          });
        }
      },
      infinite: {
        prefix: false,
        suffix: false,
        onReset: function(collection, options) {
          var cid, template, _ref;
          _ref = this.views;
          for (cid in _ref) {
            template = _ref[cid];
            this.remove({
              cid: cid
            });
          }
          this.$container.scrollTop(0);
          this.infinite.length = 0;
          this.infinite.models = this.filters != null ? collection.where(this.filters) : collection.models;
          return this.show(this.infinite.slice);
        },
        onFilter: function(collection, attributes) {
          this.filters = attributes;
          return this.reset();
        },
        onSort: function(collection, options) {
          return this.reset();
        },
        onScroll: function() {
          var height, _base;
          (_base = this.infinite).height || (_base.height = this.$selector.height() / this.infinite.length);
          height = this.$container.attr("scrollHeight");
          height -= this.$container.attr("scrollTop");
          height -= this.$container.height();
          if (this.$suffix != null) {
            height -= this.$suffix.height();
          }
          if (height < this.infinite.height * this.infinite.slice) {
            return this.show(this.infinite.length + this.infinite.slice);
          }
        },
        onShow: function(length) {
          var height, model, models, _i, _len;
          models = this.infinite.models.slice(this.infinite.length, length);
          this.infinite.length = length;
          for (_i = 0, _len = models.length; _i < _len; _i++) {
            model = models[_i];
            this.add(model);
          }
          if (this.$suffix != null) {
            height = (this.infinite.models.length - this.infinite.length) * this.infinite.height;
            height = height > 0 ? height : 0;
            return this.$suffix.height(height);
          }
        }
      }
    };

    function Collection2ViewBinder(collection, $el, options) {
      this.collection = arguments[0], this.$el = arguments[1];
      this.options = _.defaults(options, this.defaults);
      this.template = _.required(this.options, "template");
      this.$selector = this.$el.find(_.required(this.options, 'selector'));
      this.views = {};
      this.infinite = options.infinite;
      if (this.infinite != null) {
        this.options = _.extend(this.options, this.defaults.infinite, this.infinite);
      }
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
      this.handlers['filter'] = this.options['onFilter'].bind(this);
      if (this.infinite) {
        this.show = this.options["onShow"].bind(this);
        this.$container = this.$selector.closest(this.infinite.container);
        if (this.options.suffix) {
          this.$suffix = $("<div class=\"infinite-suffix\"></div>").appendTo(this.$container);
        }
        handler = this.options["onScroll"].bind(this);
        this.handlers['scroll'] = handler;
        return this.$container.on('scroll', handler);
      }
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
      return this.handlers["filter"](this.collection, attributes);
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
