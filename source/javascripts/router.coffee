class App.Router extends Backbone.Router

  routes:
    "toggle-sidebar": "toggleSidebar"
    "close-modal": "closeModal"

    "companions": "openCompanionsIndexPage"
    "companions/:id": "openCompanionsShowPage"
    "familiars": "openFamiliarsIndexPage"
    "familiars/:id": "openFamiliarsShowPage"

    "*otherwise": "index"

  toggleSidebar: ->
    App.main.toggleSidebar()

  closeModal: ->
    App.main.closeModal()

  index: ->
    @navigate("#companions", true)

  openCompanionsIndexPage: ->
    App.main.closeSidebar()
    unless App.companions?
      App.companions = new App.Collections.Companions()
      App.companions.fetch()
    view = new App.Pages.CompanionsIndex(collection: App.companions)
    App.main.openPage(view.render())

  openCompanionsShowPage: (id) ->
    return unless App.companions?
    model = App.companions.get(id)
    view = new App.Pages.CompanionsShow(model: model)
    App.main.openModal(view.render())

  openFamiliarsIndexPage: ->
    App.main.closeSidebar()

  openFamiliarsShowPage: ->
