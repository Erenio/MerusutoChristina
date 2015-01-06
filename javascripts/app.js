(function() {
  window.Ratchet = {};

  window.App = {
    Bindings: {},
    Widgets: {},
    Views: {},
    Pages: {},
    initialize: function() {
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
