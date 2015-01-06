class App.Pages.Tableview extends Backbone.View
  template: _.loadTemplate("templates/pages/tableview/index")

  store:
    selector: ".table-view"
    template: _.loadTemplate("templates/pages/tableview/show")

  events:
    "click .btn-add": "add"
    "click .btn-sort": "sort"
    "click .btn-reset": "reset"
    "click .btn-remove": "remove"

  add: ->
    model = new Backbone.Model(title: "Item #{Math.floor(Math.random() * 10)}")
    @collection.add(model, sort: false)

  sort: ->
    @collection.comparator = "title"
    @collection.sort()

  reset: ->
    @collection.reset([
      new Backbone.Model(title: "Item 3")
      new Backbone.Model(title: "Item 2")
      new Backbone.Model(title: "Item 1")
    ], sort: false)

  remove: ->
    model = @collection.at(0)
    @collection.remove(model)
