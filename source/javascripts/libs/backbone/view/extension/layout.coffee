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

  initialize: (options) ->
    _.extend(@layout, options.layout)

  render: ->
    @views = {}
    for key, options of @layout
      if _.isString(options) || _.isFunction(options)
        selector = key
        template = options
      else
        selector = _.required(options, "selector")
        template = _.required(options, "template")

      template = template(@options) if _.isFunction(template)
      if template instanceof Backbone.View
        view = template
        $template = view.render().$el
      else
        $template = $(template)
        view = new Backbone.View(el: $template)

      $selector = @$(selector)
      unless $template.html() == "" && $selector.html() != ""
        $selector.html($template)

      view.setElement($selector)
      @views[key] = view

  remove: ->
    for selector, view of @views
      view.remove()
