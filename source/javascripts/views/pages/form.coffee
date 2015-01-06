class App.Pages.Form extends Backbone.View
  template: _.loadTemplate("templates/modals/form")

  bindings:
    fullname: [
      selector: "#fullname-input"
      event: "keyup"
    , "#fullname" ]
    search: [ "#search-input", "#search" ]
    description: [ "#description-textarea", "#description" ]
    toggle: [ new App.Bindings.Toggle("#toggle-toggle"), "#toggle" ]
