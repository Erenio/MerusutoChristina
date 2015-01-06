# Layout extension for Backbone.View
# 
# class Demo extends Backbone.View
#   layout:
#     ":selector": ":view/template"
#     ":selector": -> ":view/template"
#     ":key":
#       selector: "selector (required)"
#       template: "view or template (required, string or function)"
# 

class Backbone.View.Extension.Layout

  initialize: (view, options) ->
    _.extend(view.layout, options.layout)

  render: (view) ->
    @remove(view) if view.views?
    view.views = {}

    for key, options of view.layout
      if _.isString(options) || _.isFunction(options)
        selector = key
        template = options
      else
        selector = _.required(options, "selector")
        template = _.required(options, "template")

      template = template(view.options) if _.isFunction(template)
      if template instanceof Backbone.View
        $template = template.render().$el
      else
        $template = $(template)
        template = new Backbone.View(el: $template)

      $selector = view.$(selector)
      unless $template.html() == "" && $selector.html() != ""
        $selector.html($template)

      template.setElement($selector)
      view.views[key] = template

  remove: (view) ->
    for selector, template of view.views
      template.remove()
