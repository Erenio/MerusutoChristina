(function() {
  Backbone.View.Extension.Layout = (function() {
    function Layout() {}

    Layout.prototype.initialize = function(view, options) {
      return _.extend(view.layout, options.layout);
    };

    Layout.prototype.render = function(view) {
      var $selector, key, options, selector, template, templateOptions, _ref, _results;
      if (view.views != null) {
        this.remove(view);
      }
      view.views = {};
      _ref = view.layout;
      _results = [];
      for (key in _ref) {
        options = _ref[key];
        if (_.isString(options) || _.isFunction(options)) {
          selector = key;
          template = options;
        } else {
          selector = _.required(options, "selector");
          template = _.required(options, "template");
        }
        $selector = view.$(selector);
        if (_.isFunction(template)) {
          templateOptions = {
            el: $selector,
            parent: view
          };
          _.defaults(templateOptions, options.options);
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
        _results.push(view.views[key] = template);
      }
      return _results;
    };

    Layout.prototype.remove = function(view) {
      var selector, template, _ref, _results;
      _ref = view.views;
      _results = [];
      for (selector in _ref) {
        template = _ref[selector];
        _results.push(template.remove());
      }
      return _results;
    };

    return Layout;

  })();

}).call(this);
