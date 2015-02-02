class App.Router extends Backbone.Router

  routes:
    "toggle-sidebar": "toggleSidebar"
    "close-modal": "closeModal"

    "units": "openUnitsIndexPage"
    "units/:id": "openUnitsShowPage"
    "monsters": "openMonstersIndexPage"
    "monsters/:id": "openMonstersShowPage"

    "*otherwise": "index"

  toggleSidebar: ->
    App.main.toggleSidebar()

  closeModal: ->
    App.main.closeModal()

  index: ->
    @navigate("#units", true)

  openUnitsIndexPage: ->
    unless App.units?
      App.units = new App.Collections.Units()
      App.units.fetch(reset: true)
    view = new App.Pages.UnitsIndex(collection: App.units)
    App.main.openPage(view.render())

  openUnitsShowPage: (id) ->
    return @navigate("#units", true) unless App.units?
    model = App.units.get(id)
    view = new App.Pages.UnitsShow(model: model)
    App.main.openModal(view.render())

  openMonstersIndexPage: ->
    unless App.monsters?
      App.monsters = new App.Collections.Monsters()
      App.monsters.fetch(reset: true)
    view = new App.Pages.MonstersIndex(collection: App.monsters)
    App.main.openPage(view.render())

  openMonstersShowPage: (id) ->
    return @navigate("#monsters", true) unless App.monsters?
    model = App.monsters.get(id)
    view = new App.Pages.MonstersShow(model: model)
    App.main.openModal(view.render())
