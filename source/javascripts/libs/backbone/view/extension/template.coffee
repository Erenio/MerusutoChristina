class Backbone.View.Extension.Template

  force: true

  constructor: (view, options) ->
    template = options.template || view.template
    if template?
      template = template(options) if _.isFunction(template)
      $template = $(template)
      if options.el
        $(options.el).html($template)
      else
        options.el = $template
