#= require views/widgets/slider

class App.Pages.UnitsShow extends Backbone.View
  template: _.loadTemplate("templates/modals/units/show")

  layout:
    ".slider": App.Widgets.Slider

  afterRender: ->
    $image = @$(".slider .image")

    resize = ->
      if window.innerWidth < window.innerHeight
        $image.width("100%")
        $image.height("auto")
      else
        $image.width("auto")
        $image.height("100%")

    _.defer resize
    $(window).resize resize
