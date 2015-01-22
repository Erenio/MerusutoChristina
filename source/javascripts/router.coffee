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
      App.companions.fetch(reset: true)
    view = new App.Pages.CompanionsIndex(collection: App.companions)
    App.main.openPage(view.render())

  openCompanionsShowPage: (id) ->
    return @navigate("#companions", true) unless App.companions?
    model = App.companions.get(id)
    view = new App.Pages.CompanionsShow(model: model)
    App.main.openModal(view.render())

  openFamiliarsIndexPage: ->
    App.main.closeSidebar()
    unless App.familiars?
      App.familiars = new App.Collections.Familiars()
      App.familiars.fetch(reset: true)
    view = new App.Pages.FamiliarsIndex(collection: App.familiars)
    App.main.openPage(view.render())

  openFamiliarsShowPage: (id) ->
    return @navigate("#familiars", true) unless App.familiars?
    model = App.familiars.get(id)
    view = new App.Pages.FamiliarsShow(model: model)
    App.main.openModal(view.render())
