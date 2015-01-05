# Debug extension for Backbone.View
# Show debug infomations
# 

key = (view) ->
  "#{view.cid}(#{view.constructor.name})"

class Backbone.View.Extension.Debug

  force: true

  beforeInitialize: (options) ->
    _.debug("Create new Backbone.View: #{key(@)}")
    _.time("Create #{key(@)}")

  afterRender: ->
    _.debug("Render Backbone.View: #{key(@)}")
    _.timeEnd("Create #{key(@)}")

  beforeRemove: ->
    _.debug("Remove Backbone.View: #{key(@)}")

