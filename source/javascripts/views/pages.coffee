class App.Views.Slider extends Backbone.View
  template: _.loadTemplate("templates/pages/sliders")

  layout:
    ".slider": -> new App.Widgets.Slider()

class App.Views.Tableview extends Backbone.View
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

class App.Views.Form extends Backbone.View
  template: _.loadTemplate("templates/modals/form")

  bindings:
    fullname: [
      selector: "#fullname-input"
      event: "keyup"
    , "#fullname" ]
    search: [ "#search-input", "#search" ]
    description: [ "#description-textarea", "#description" ]
    toggle: [
      selector: "#toggle-toggle"
      event: "click"
      onSet: ($el, model, attr) ->
        $el.toggleClass("active")
        model.set(attr, $el.hasClass("active"))
    , "#toggle" ]
