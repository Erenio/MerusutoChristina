# 2-ways binding extension for Backbone.View
# Auto update html when model change, and update model when html change
# 
# class Demo extends Backbone.View
#   bindings:
#     ":attribute": ":selector"
#     ":attribute": 
#       selector: "selector (required)"
#       accessor: "method called for set/get value on $el, string or function \
#         (optional, default: 'val' for input/textarea, 'text' for the other)"
#       event: "event (optional, default: 'change' for input/textarea)"
#       reverse: "is 2-ways binding (optional, default: true)"
#       onGet: ($el, model, attr, value) ->
#         "callback on get model attribute (optional)"
#       onSet: ($el, model, attr, event) -> 
#         "callback on set model attribute (optional)"
#     ":attribute": [
#       options
#       options
#     ]
# 

class Binder
  constructor: (model, attr, $el, options) ->
    [ @model, @attr, @$el ] = arguments
    @options = _.defaults(options, @defaults)
    @selector = _.required(options, 'selector')

class View2ModelBinder extends Binder
  defaults:
    event: "change"
    accessor: "val"
    reverse: true
    onSet: ($el, model, attr, event) ->
      accessor = @options.accessor
      accessor = $el[accessor] if _.isString(accessor)
      value = accessor.call($el)
      model.set(attr, value)

  constructor: ->
    super

    if @options.reverse
      @reverse = new Model2ViewBinder(@model, @attribute, @$el, @options)

  on: ->
    @off() if @handler?

    @handler = (event) =>
      @reverse._pending = true if @reverse
      $selector = @$el.find(@selector)
      # _.debug "View2ModelBinder: #{$selector.attr('id')}"
      @options.onSet.call(@, $selector, @model, @attr, event)
    
    @$el.on(@options.event, @selector, @handler)
    @reverse.on() if @reverse

  off: ->
    @$el.off(@options.event, @selector, @handler)
    @reverse.off() if @reverse

class Model2ViewBinder extends Binder
  defaults:
    accessor: "text"
    onGet: ($el, model, attr, value) ->
      accessor = @options.accessor
      accessor = $el[accessor] if _.isString(accessor)
      accessor.call($el, value)

  on: ->
    @off() if @handler?
    @handler = (model, value) =>
      return @_pending = false if @_pending
      $selector = @$el.find(@selector)
      # _.debug "Model2ViewBinder: #{$selector.attr('id')}"
      @options.onGet.call(@, $selector, model, @attr, value)
    @model.on("change:#{@attr}", @handler)

  off: ->
    @model.off("change:#{@attr}", @handler)

class Backbone.View.Extension.Bindings

  initialize: (options) ->
    @model = _.required(options, "model")
    @binders = []

    for attribute, bindings of @bindings
      bindings = if _.isArray(bindings) then bindings else [ bindings ]
      for binding in bindings
        binding = { selector: binding } if _.isString(binding)

        $selector = @$(_.required(binding, 'selector'))
        tag = $selector.attr("tagName").toLowerCase()

        if /input|textarea/.test(tag) || binding.event
          binder = new View2ModelBinder(@model, attribute, @$el, binding)
        else
          binder = new Model2ViewBinder(@model, attribute, @$el, binding)

        binder.on()
        @binders.push binder

  remove: ->
    for binder in @binders
      binder.off()
      