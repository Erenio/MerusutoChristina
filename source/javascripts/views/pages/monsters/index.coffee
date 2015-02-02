#= require views/pages/units/index

class App.Pages.MonstersIndex extends App.Pages.UnitsIndex
  template: _.loadTemplate("templates/pages/monsters/index")

  store: _.extend {}, App.Pages.UnitsIndex::store,
    template: _.loadTemplate("templates/pages/monsters/item")
