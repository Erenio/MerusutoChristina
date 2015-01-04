window.Ratchet = {}

window.App =

  Views: {}
  Widgets: {}

  initialize: ->
    @main = new App.Views.Main
      el: $('body')
    @main.render()

    @router = new App.Router()

    # Start backbone history
    Backbone.history.start()

$ ->
  App.initialize()
