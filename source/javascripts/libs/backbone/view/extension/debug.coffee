class Backbone.View.Extension.Debug

  force: true

  beforeInitialize: (options) ->
    key = "#{@constructor.name}(#{@cid})"
    _.debug("Create new Backbone.View: #{key}")
    _.time(key)

  afterRender: ->
    key = "#{@constructor.name}(#{@cid})"
    _.timeEnd(key)
