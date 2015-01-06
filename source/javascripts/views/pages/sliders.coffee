class App.Pages.Sliders extends Backbone.View
  template: _.loadTemplate("templates/pages/sliders")

  layout:
    ".slider": -> new App.Widgets.Slider()
