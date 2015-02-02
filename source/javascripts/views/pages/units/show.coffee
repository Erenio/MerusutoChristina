#= require views/widgets/slider

class App.Pages.UnitsShow extends Backbone.View
  template: _.loadTemplate("templates/modals/units/show")

  layout:
    ".slider": App.Widgets.Slider
