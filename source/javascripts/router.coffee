class App.Router extends Backbone.Router

  routes:
    "toggle-sidebar": "toggleSidebar"
    "close-modal": "closeModal"

    "pages/sliders": "openSlidersPage"
    "pages/tableview": "openTableviewPage"
    "pages/*path": "openPage"
    "modals/form": "openFormModal"
    "modals/*path": "openModal"

    "*otherwise": "index"

  toggleSidebar: ->
    App.main.toggleSidebar()

  closeModal: ->
    App.main.closeModal()

  index: ->
    @navigate("#pages/typography", true)

  openSlidersPage: ->
    view = new App.Views.Slider()
    App.main.openPage(view.render())

  openTableviewPage: ->
    collection = new Backbone.Collection([
      new Backbone.Model(title: "Item 3")
      new Backbone.Model(title: "Item 2")
      new Backbone.Model(title: "Item 1")
    ])
    view = new App.Views.Tableview(collection: collection)
    App.main.openPage(view.render())

  openFormModal: ->
    model = new Backbone.Model()
    view = new App.Views.Form(model: model)
    App.main.openModal(view.render())

  openPage: (path = 'topography') ->
    view = new Backbone.View
      template: _.loadTemplate("templates/pages/#{path}")
    App.main.openPage(view.render())

  openModal: (path = 'modal') ->
    view = new Backbone.View
      template: _.loadTemplate("templates/modals/#{path}")
    App.main.openModal(view.render())