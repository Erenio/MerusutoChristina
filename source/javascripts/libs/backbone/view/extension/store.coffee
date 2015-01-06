# Store (collection) extension for Backbone.View
# Auto update html when collection add/sort/reset/remove
# 
# class Demo extends Backbone.View
#   store:
#     selector: "selector (required)"
#     template: "view or template (required, string or function)"
#     onAdd: (model, collection, options) -> 
#       "callback on add model to collection (optional)"
#     onSort: (collection, options) -> 
#       "callback on sort collection (optional)"
#     onReset: (collection, options) -> 
#       "callback on reset collection (optional)"
#     onRemove: (model, options) -> 
#       "callback on remove model from collection (optional)"
# 

class Collection2ViewBinder
  defaults:
    onAdd: (model, collection, options) ->
      template = @template
      template = template(model) if _.isFunction(template)
      $template = if template instanceof Backbone.View
          template.render().$el
        else
          $(template)
      $template.appendTo(@$selector)
        .data("model-cid", model.cid)
    onSort: (collection, options) ->
      collection.each (model) =>
        @$selector.children("[data-model-cid='#{model.cid}']")
          .appendTo(@$selector)
    onReset: (collection, options) ->
      @$selector.empty()
      collection.each (model) =>
        @handlers["add"](model, collection)
    onRemove: (model, options) ->
      @$selector.children("[data-model-cid='#{model.cid}']")
        .remove()

  constructor: (collection, $el, options) ->
    [ @collection, @$el ] = arguments
    @options = _.defaults(options, @defaults)
    @template = _.required(@options, "template")
    @$selector = @$el.find(_.required(@options, 'selector'))

  on: ->
    @off() if @handlers?

    @handlers = {}
    for key in [ 'Add', 'Sort', 'Reset', 'Remove' ]
      event = key.toLowerCase()
      method = "on#{key}"
      handler = @options[method].bind(@)
      @handlers[event] = handler
      @collection.on(event, handler)

  off: ->
    for event, handler of @handlers
      @collection.off(event, handler)


class Backbone.View.Extension.Store

  initialize: (view, options) ->
    @collection = _.required(options, "collection")
    view.binder = new Collection2ViewBinder(@collection, view.$el, view.store)
    view.binder.on()

  render: (view) ->
    view.binder.handlers["reset"](@collection)

  remove: (view) ->
    view.binder.off()
