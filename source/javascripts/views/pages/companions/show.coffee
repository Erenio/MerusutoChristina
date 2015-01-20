class App.Pages.CompanionsShow extends Backbone.View
  template: _.loadTemplate("templates/modals/companions/show")

  events:
    "click": "closeModal"

  closeModal: ->
    Backbone.history.loadUrl("#close-modal")
