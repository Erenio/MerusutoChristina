#= require views/widgets/slider

class App.Pages.UnitsShow extends Backbone.View
  template: _.loadTemplate("templates/modals/units/show")

  layout:
    ".slider": App.Widgets.Slider

  afterRender: ->
    $image = @$(".slider .image")
    radio = null

    resize = ->
      if window.innerWidth / window.innerHeight < radio
        $image.width("100%")
        $image.height("auto")
      else
        $image.width("auto")
        $image.height("100%")

    _.defer ->
      radio = $image.width() / $image.height()
      resize()
    $(window).resize resize
