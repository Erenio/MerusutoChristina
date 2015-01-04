class App.Router extends Backbone.Router

  routes:
    "toggle-sidebar": "toggleSidebar"
    "close-modal": "closeModal"

    "pages/sliders": "openSlidersPage"
    "pages/*path": "openPage"
    "modals/*path": "openModal"

    "*otherwise": "index"

  toggleSidebar: ->
    App.main.toggleSidebar()

  closeModal: ->
    App.main.closeModal()

  index: ->
    @navigate("#pages/typography", true)

  openSlidersPage: ->
    view = new App.Widgets.Slider
      template: _.loadTemplate("templates/pages/sliders")
    App.main.openPage(view.render())

  openPage: (path = 'topography') ->
    view = new Backbone.View
      template: _.loadTemplate("templates/pages/#{path}")
    App.main.openPage(view.render())

  openModal: (path = 'modal') ->
    view = new Backbone.View
      template: _.loadTemplate("templates/modals/#{path}")
    App.main.openModal(view.render())