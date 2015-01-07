(function() {
  window.Ratchet = {};

  window.App = {
    Bindings: {},
    Utils: {},
    Widgets: {},
    Views: {},
    Pages: {},
    Collections: {},
    Models: {},
    initialize: function() {
      _.setDebugLevel(2);
      this.main = new App.Views.Main({
        el: $('body')
      });
      this.main.render();
      this.router = new App.Router();
      return Backbone.history.start();
    }
  };

  $(function() {
    return App.initialize();
  });

}).call(this);
