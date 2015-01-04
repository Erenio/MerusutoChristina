Backbone.View.Extension = {}

BaseView = Backbone.View

class View extends BaseView

  constructor: (options = {}) ->
    @extensions = []
    for key, klass of Backbone.View.Extension
      if @[key.toLowerCase()]? || klass::force
        extension = new klass(@, options)
        @extensions.push(extension)
    BaseView.call(@, options)

  _runExtensionCallbacks: (key, args) ->
    for extension in @extensions
      extension[key]?.apply(@, args)

_.each ['initialize', 'render', 'remove'], (method) ->
  titleizedKey = method.charAt(0).toUpperCase() + method.slice(1)
  beforeMethod = "before#{titleizedKey}"
  afterMethod = "after#{titleizedKey}"

  View::[method] = ->
    @[beforeMethod].apply(@, arguments) if @[beforeMethod]?
    @_runExtensionCallbacks(beforeMethod, arguments)
    @_runExtensionCallbacks(method, arguments)
    @_runExtensionCallbacks(afterMethod, arguments)
    @[afterMethod].apply(@, arguments) if @[afterMethod]?
    BaseView::[method].apply(@, arguments)
    
Backbone.View = View
