(function() {
  Backbone.View.Extension.Layout = (function() {
    function Layout() {}

    Layout.prototype.initialize = function(view, options) {
      return _.extend(view.layout, options.layout);
    };

    Layout.prototype.render = function(view) {
      var $selector, $template, key, options, selector, template, _ref, _results;
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
        if (_.isFunction(template)) {
          template = template(view.options);
        }
        if (template instanceof Backbone.View) {
          $template = template.render().$el;
        } else {
          $template = $(template);
        }
        $selector = view.$(selector);
        if (!($template.html() === "" && $selector.html() !== "")) {
          $selector.html($template);
        }
        if (template.setElement != null) {
          template.setElement($selector);
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
