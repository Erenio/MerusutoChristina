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
  
  toggleSidebar: ->
    @views["container"].toggleSidebar()

  openModal: (view) ->
    @views["modal"].render(view).show()

  closeModal: () ->
    @views["modal"].hide()

  openPage: (view) ->
    @views["container"].render(view)

class App.Views.Container extends Backbone.View
  template: ""

  afterRender: (view, reverse = false) ->
    if view?
      @lastPage.remove() if @lastPage?
      @lastPage = @currPage
      @currPage = new App.Views.Page().render(view)
      @currPage.$el.appendTo(@$el)
      if @lastPage?
        @lastPage.hide() 
        @currPage.show()

  onClickSidebarActive: (event) =>
    @toggleSidebar()
    event.stopImmediatePropagation()
    event.preventDefault()

  toggleSidebar: ->
    @$el.toggleClass("sidebar-active")
    if @$el.hasClass("sidebar-active")
      @$el.on "click", @onClickSidebarActive
    else
      @$el.off "click", @onClickSidebarActive

class App.Views.Modal extends Backbone.View
  template: ""

  afterRender: (view) ->
    if view?
      @view.remove() if @view?
      @view = view
      @$el.html(view.$el)

  afterRemove: ->
    @view.remove() if @view?

  show: ->
    @$el.addClass("active")

  hide: ->
    @$el.removeClass("active")

class App.Views.Page extends App.Views.Modal
  template: _.loadTemplate("templates/page")
  
  show: ->
    @$el.addClass("sliding right")
    _.defer =>
      # Make sure addClass is called after the dom has been appended
      # by calling `@el.offsetWidth'
      @el.offsetWidth
      @$el.removeClass("right")

  hide: ->
    @$el.addClass("left")
