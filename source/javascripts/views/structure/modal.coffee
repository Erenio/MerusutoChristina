#= require views/structure/page

class App.Views.Modal extends App.Views.Page
  template: undefined

  show: ->
    @$el.addClass("active")

  hide: ->
    @$el.removeClass("active")
