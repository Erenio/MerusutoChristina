class App.Pages.FamiliarsIndex extends App.Pages.CompanionsIndex
  template: _.loadTemplate("templates/pages/familiars/index")

  store: _.extend {}, App.Pages.CompanionsIndex::store,
    template: _.loadTemplate("templates/pages/familiars/item")
