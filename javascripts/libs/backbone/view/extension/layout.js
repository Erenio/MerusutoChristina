(function() {
  Backbone.View.Extension.Layout = (function() {
    function Layout() {}

    Layout.prototype.initialize = function(options) {
      return _.extend(this.layout, options.layout);
    };

    Layout.prototype.render = function() {
      var $selector, $template, key, options, selector, template, view, _ref, _results;
      this.views = {};
      _ref = this.layout;
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
          template = template(this.options);
        }
        if (template instanceof Backbone.View) {
          view = template;
          $template = view.render().$el;
        } else {
          $template = $(template);
          view = new Backbone.View({
            el: $template
          });
        }
        $selector = this.$(selector);
        if (!($template.html() === "" && $selector.html() !== "")) {
          $selector.html($template);
        }
        view.setElement($selector);
        _results.push(this.views[key] = view);
      }
      return _results;
    };

    Layout.prototype.remove = function() {
      var selector, view, _ref, _results;
      _ref = this.views;
      _results = [];
      for (selector in _ref) {
        view = _ref[selector];
        _results.push(view.remove());
      }
      return _results;
    };

    return Layout;

  })();

}).call(this);
