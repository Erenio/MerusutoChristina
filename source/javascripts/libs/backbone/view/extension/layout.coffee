class Backbone.View.Extension.Layout

  initialize: (options) ->
    _.extend(@layout, options.layout)

  render: ->
    @views = {}
    for selector, view of @layout
      view = view.apply(@, arguments) if _.isFunction(view)
      $selector = @$(selector)
      $selector.html(view.render().$el)
      view.setElement($selector)
      @views[selector] = view

  remove: ->
    for selector, view in @views
      view.remove()
