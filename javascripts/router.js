(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "toggle-sidebar": "toggleSidebar",
      "close-modal": "closeModal",
      "units": "openUnitsIndexPage",
      "units/:id": "openUnitsShowPage",
      "monsters": "openMonstersIndexPage",
      "monsters/:id": "openMonstersShowPage",
      "*otherwise": "index"
    };

    Router.prototype.toggleSidebar = function() {
      return App.main.toggleSidebar();
    };

    Router.prototype.closeModal = function() {
      return App.main.closeModal();
    };

    Router.prototype.index = function() {
      return this.navigate("#units", true);
    };

    Router.prototype.openUnitsIndexPage = function() {
      var view;
      if (App.units == null) {
        App.units = new App.Collections.Units();
        App.units.fetch({
          reset: true
        });
      }
      view = new App.Pages.UnitsIndex({
        collection: App.units
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openUnitsShowPage = function(id) {
      var model, view;
      if (App.units == null) {
        return this.navigate("#units", true);
      }
      model = App.units.get(id);
      view = new App.Pages.UnitsShow({
        model: model
      });
      return App.main.openModal(view.render());
    };

    Router.prototype.openMonstersIndexPage = function() {
      var view;
      if (App.monsters == null) {
        App.monsters = new App.Collections.Monsters();
        App.monsters.fetch({
          reset: true
        });
      }
      view = new App.Pages.MonstersIndex({
        collection: App.monsters
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openMonstersShowPage = function(id) {
      var model, view;
      if (App.monsters == null) {
        return this.navigate("#monsters", true);
      }
      model = App.monsters.get(id);
      view = new App.Pages.MonstersShow({
        model: model
      });
      return App.main.openModal(view.render());
    };

    return Router;

  })(Backbone.Router);

}).call(this);
