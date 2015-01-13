class App.Pages.CompanionsItem extends Backbone.View
  template: _.loadTemplate("templates/pages/companions/item")

  bindings:
    "#life": "life"
    "#atk": "atk"

class App.Pages.CompanionsIndex extends Backbone.View
  template: _.loadTemplate("templates/pages/companions/index")

  store:
    selector: ".table-view"
    template: (options) ->
      new App.Pages.CompanionsItem(options)

  events:
    "click .dropdown-toggle": "toggleDropdown"
    "click .dropdown-submenu > a": "triggerHover"
    "click .reset-filter": "resetFilter"
    "click .filter": "setFilter"
    "click .sort-mode": "setSortMode"
    "click .level-mode": "setLevelMode"

  triggerHover: (event) ->
    $(event.target).trigger('hover')
    event.stopPropagation()

  toggleDropdown: (event) ->
    $dropdown = $(event.target).parent(".dropdown")
    if $dropdown.hasClass("active")
      $dropdown.removeClass("active")
    else
      $(".dropdown.active").removeClass("active")
      $dropdown.addClass("active")
    $dropdown.closest(".container").one "click", ->
      $dropdown.removeClass("active")
    event.stopPropagation()

  afterInitialize: ->
    @filters = {}

  resetFilter: (event) ->
    $target = $(event.target)
    @removeAllActive($target)
    if key = $target.data("key")
      delete @filters[key]
    else
      @filters = {}
    @binder.filter(@filters)

  removeAllActive: ($target) ->
    $target.closest('.dropdown-menu').find('.active').removeClass('active')

  setActive: ($target) ->
    @removeAllActive($target)
    $target.parent('li').toggleClass("active")

  setFilter: (event) ->
    $target = $(event.target)
    @setActive($target)
    @filters[$target.data("key")] = parseInt($target.data("value"))
    @binder.filter(@filters)

  setSortMode: (event) ->
    $target = $(event.target)
    @setActive($target)
    key = $target.data("key")
    @binder.sort (model) -> -model.get(key)

  setLevelMode: (event) ->
    $target = $(event.target)
    @setActive($target)
    key = $target.data("key")
    @binder.collection.each (model) ->
      model.setLevelMode(key)
