window.Ratchet = {}

window.App =

  Bindings: {}
  Utils: {}

  Widgets: {}
  Views: {}
  Pages: {}

  Collections: {}
  Models: {}

  initialize: ->
    _.setDebugLevel(2)
    
    @main = new App.Views.Main
      el: $('body')
    @main.render()

    @router = new App.Router()

    # Start backbone history
    Backbone.history.start()

$ ->
  App.initialize()
