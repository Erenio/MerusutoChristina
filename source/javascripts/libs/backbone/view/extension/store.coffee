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
      if _.isFunction(template)
        template = template(model: model, collection: collection)
      if template instanceof Backbone.View
        $template = template.render().$el
      else
        $template = template = $(template)
      $template.appendTo(@$selector)
      @views[model.cid] = template
    onSort: (collection, options) ->
      for model in collection.models
        $template = @views[model.cid]
        $template = $template.$el if $template.$el?
        $template.appendTo(@$selector)
    onReset: (collection, options) ->
      for cid, $template of @views
        $template.remove()
        delete @views[cid]
      for model in collection.models
        @add(model, collection)
    onRemove: (model, options) ->
      @views[model.cid].remove()
      delete @views[model.cid]
    onFilter: (attributes) ->
      eachTemplate = (collection, callback) =>
        for model in collection
          $template = @views[model.cid]
          $template = $template.$el if $template.$el?
          callback($template)
      if attributes?
        eachTemplate @collection.models, ($template) ->
          $template.hide()
        eachTemplate @collection.where(attributes), ($template) ->
          $template.show()
      else
        eachTemplate @collection.models, ($template) ->
          $template.show()

  constructor: (collection, $el, options) ->
    [ @collection, @$el ] = arguments
    @options = _.defaults(options, @defaults)
    @template = _.required(@options, "template")
    @$selector = @$el.find(_.required(@options, 'selector'))
    @views = {}

  on: ->
    @off() if @handlers?

    @handlers = {}
    for key in [ 'Add', 'Sort', 'Reset', 'Remove' ]
      event = key.toLowerCase()
      method = "on#{key}"
      handler = @options[method].bind(@)
      @handlers[event] = handler
      @collection.on(event, handler)
    @handlers['filter'] = @options['onFilter'].bind(@)

  off: ->
    for event, handler of @handlers
      @collection.off(event, handler)

  add: (model) ->
    @handlers["add"](model, @collection)

  remove: (model) ->
    @handlers["remove"](model)

  reset: (collection = @collection) ->
    @handlers["reset"](collection)

  filter: (attributes) ->
    attributes = undefined unless attributes? && Object.keys(attributes).length != 0
    @handlers["filter"](attributes)

  sort: (comparator) ->
    @collection.comparator = comparator
    @collection.sort()

class Backbone.View.Extension.Store

  initialize: (view, options) ->
    if view.collection
      collection = view.collection
      collection = collection(options) if _.isFunction(collection)
    else
      collection = _.required(options, "collection")

    view.binder = new Collection2ViewBinder(collection, view.$el, view.store)
    view.binder.on()

  render: (view) ->
    view.binder.reset()

  remove: (view) ->
    view.binder.off()
