(function() {
  Backbone.View.Extension.Template = (function() {
    Template.prototype.force = true;

    function Template(view, options) {
      var $template, template;
      template = options.template || view.template;
      if (template != null) {
        if (_.isFunction(template)) {
          template = template(options);
        }
        $template = $(template);
        if (options.el) {
          $(options.el).html($template);
        } else {
          options.el = $template;
        }
      }
    }

    return Template;

  })();

}).call(this);
