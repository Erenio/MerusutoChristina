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
      "companions": "openCompanionsIndexPage",
      "companions/:id": "openCompanionsShowPage",
      "familiars": "openFamiliarsIndexPage",
      "familiars/:id": "openFamiliarsShowPage",
      "*otherwise": "index"
    };

    Router.prototype.toggleSidebar = function() {
      return App.main.toggleSidebar();
    };

    Router.prototype.closeModal = function() {
      return App.main.closeModal();
    };

    Router.prototype.index = function() {
      return this.navigate("#companions", true);
    };

    Router.prototype.openCompanionsIndexPage = function() {
      var view;
      if (App.companions == null) {
        App.companions = new App.Collections.Companions();
        App.companions.fetch({
          reset: true
        });
      }
      view = new App.Pages.CompanionsIndex({
        collection: App.companions
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openCompanionsShowPage = function(id) {
      var model, view;
      if (App.companions == null) {
        return this.navigate("#companions", true);
      }
      model = App.companions.get(id);
      view = new App.Pages.CompanionsShow({
        model: model
      });
      return App.main.openModal(view.render());
    };

    Router.prototype.openFamiliarsIndexPage = function() {
      var view;
      if (App.familiars == null) {
        App.familiars = new App.Collections.Familiars();
        App.familiars.fetch({
          reset: true
        });
      }
      view = new App.Pages.FamiliarsIndex({
        collection: App.familiars
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openFamiliarsShowPage = function(id) {
      var model, view;
      if (App.familiars == null) {
        return this.navigate("#familiars", true);
      }
      model = App.familiars.get(id);
      view = new App.Pages.FamiliarsShow({
        model: model
      });
      return App.main.openModal(view.render());
    };

    return Router;

  })(Backbone.Router);

}).call(this);
