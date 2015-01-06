window.Ratchet = {}

window.App =

  Bindings: {}

  Widgets: {}
  Views: {}
  Pages: {}

  initialize: ->
    @main = new App.Views.Main
      el: $('body')
    @main.render()

    @router = new App.Router()

    # Start backbone history
    Backbone.history.start()

$ ->
  App.initialize()
