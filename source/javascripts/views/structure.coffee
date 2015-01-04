class App.Views.Main extends Backbone.View
  template: _.loadTemplate("templates/main")

  layout:
    "container": -> new App.Views.Container()
    "modal": -> new App.Views.Modal()

  events:
    "click a[sref]": "gotoState"

  gotoState: (event) ->
    # load url & run callback defined in AppRouter without change hash
    url = $(event.currentTarget).attr("sref")
    Backbone.history.loadUrl(url)
    event.preventDefault()

  sidebarOpenOnContainerClick: (event) =>
    @toggleSidebar()
    event.stopImmediatePropagation()
    event.preventDefault()
  
  toggleSidebar: ->
    @$el.toggleClass("sidebar-open")
    $container = @views["container"].$el
    if @$el.hasClass("sidebar-open")
      $container.on "click", @sidebarOpenOnContainerClick
    else
      $container.off "click", @sidebarOpenOnContainerClick

  openModal: (view) ->
    @views["modal"].render(view)
    @$el.addClass("modal-open")

  closeModal: () ->
    @$el.removeClass("modal-open")

  openPage: (view) ->
    @views["container"].render(view)

class App.Views.Container extends Backbone.View
  template: ""

  afterRender: (view, reverse = false) ->
    if view?
      @lastPage.remove() if @lastPage?
      @lastPage = @currPage.expire() if @currPage?
      @currPage = new App.Views.Page().render(view)
      @$el.append(@currPage.$el)

      if @lastPage?
        @$el.addClass("page-transform")
        @$el.addClass("reverse") if reverse

class App.Views.Page extends Backbone.View
  template: _.loadTemplate("templates/page")
  
  afterRender: (view) ->
    if view?
      @view = view
      @$el.html(view.$el)
      _.defer =>
        # Make sure addClass is called after the dom has been appended
        # by calling `@el.offsetWidth'
        @el.offsetWidth
        @$el.addClass("active")

  expire: ->
    @$el.removeClass("active").addClass("inactive")
    @

  afterRemove: ->
    @view.remove() if @view?

class App.Views.Modal extends Backbone.View
  template: ""

  afterRender: (view) ->
    if view?
      @view = view
      @$el.html(view.$el)
