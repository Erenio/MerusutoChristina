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
      "pages/sliders": "openSlidersPage",
      "pages/tableview": "openTableviewPage",
      "pages/*path": "openPage",
      "modals/form": "openFormModal",
      "modals/*path": "openModal",
      "*otherwise": "index"
    };

    Router.prototype.toggleSidebar = function() {
      return App.main.toggleSidebar();
    };

    Router.prototype.closeModal = function() {
      return App.main.closeModal();
    };

    Router.prototype.index = function() {
      return this.navigate("#pages/typography", true);
    };

    Router.prototype.openSlidersPage = function() {
      var view;
      view = new App.Pages.Sliders();
      return App.main.openPage(view.render());
    };

    Router.prototype.openTableviewPage = function() {
      var collection, view;
      collection = new Backbone.Collection([
        new Backbone.Model({
          title: "Item 3"
        }), new Backbone.Model({
          title: "Item 2"
        }), new Backbone.Model({
          title: "Item 1"
        })
      ]);
      view = new App.Pages.Tableview({
        collection: collection
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openFormModal = function() {
      var model, view;
      model = new Backbone.Model();
      view = new App.Pages.Form({
        model: model
      });
      return App.main.openModal(view.render());
    };

    Router.prototype.openPage = function(path) {
      var view;
      if (path == null) {
        path = 'topography';
      }
      view = new Backbone.View({
        template: _.loadTemplate("templates/pages/" + path)
      });
      return App.main.openPage(view.render());
    };

    Router.prototype.openModal = function(path) {
      var view;
      if (path == null) {
        path = 'modal';
      }
      view = new Backbone.View({
        template: _.loadTemplate("templates/modals/" + path)
      });
      return App.main.openModal(view.render());
    };

    return Router;

  })(Backbone.Router);

}).call(this);
