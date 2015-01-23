class App.Pages.CompanionsItem extends Backbone.View
  template: _.loadTemplate("templates/pages/companions/item")

  bindings:
    "#life": "life"
    "#atk": "atk"

class App.Pages.CompanionsIndex extends Backbone.View
  template: _.loadTemplate("templates/pages/companions/index")

  store:
    selector: ".table-view"
    template: App.Pages.CompanionsItem
    infinite:
      container: ".content"
      slice: 10
      suffix: true

  events:
    "click .dropdown-toggle": "toggleDropdown"
    "click .dropdown-submenu > a": "triggerHover"
    "click .filter-reset": "resetFilter"
    "click .filter": "setFilter"
    "click .sort-mode": "setSortMode"
    "click .level-mode": "setLevelMode"
    "click .search-open": "openSearch"
    "click .search-close": "closeSearch"

  beforeInitialize: ->
    @filters = {}

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

  openSearch: (event) ->
    $children = $(event.target).closest("header").children()
    $search = $children.filter(".input-search")
    $children.not($search).hide()
    $search.show()
    $input = $search.children("input")
    $input.trigger("focus").val("")
    @searchInterval = setInterval =>
      query = $input.val()
      @search(query)
    , 200

  closeSearch: (event) ->
    @binder.filter(@filters)
    clearInterval(@searchInterval) if @searchInterval
    $children = $(event.target).closest("header").children()
    $search = $children.filter(".input-search")
    $children.not($search).show()
    $search.hide()

  search: (query) ->
    if query != @searchQuery
      @binder.filter (collection) =>
        models = if _.isEmpty(@filters)
            collection.models
          else
            collection.where(@filters)
        if query != ""
          models = _.filter models, (model) ->
            for key in ["name", "title"]
              value = model.get(key)
              if value && value.indexOf(query) >= 0
                return true
            false
        models
      @searchQuery = query

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