#= require views/widgets/slider

class App.Pages.CompanionsShow extends Backbone.View
  template: _.loadTemplate("templates/modals/companions/show")

  layout:
    ".slider": App.Widgets.Slider
