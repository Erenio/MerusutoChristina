class App.Views.Main extends Backbone.View
  template: _.loadTemplate("templates/main")

  layout:
    "container": -> new App.Views.Container()
    "modal": -> new App.Views.Modal()

  events:
    "click a[sref]": "gotoState"

  gotoState: (event) ->
    # load url & run callback defined in AppRouter without change hash
    url = $(event.currentTarget).attr("sref")
    Backbone.history.loadUrl(url)
    event.preventDefault()
  
  toggleSidebar: ->
    @views["container"].toggleSidebar()

  openModal: (view) ->
    @views["modal"].render(view).show()

  closeModal: () ->
    @views["modal"].hide()

  openPage: (view) ->
    @views["container"].render(view)

