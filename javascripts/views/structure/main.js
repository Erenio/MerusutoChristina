(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.Main = (function(_super) {
    __extends(Main, _super);

    function Main() {
      return Main.__super__.constructor.apply(this, arguments);
    }

    Main.prototype.template = _.loadTemplate("templates/main");

    Main.prototype.layout = {
      "container": function() {
        return new App.Views.Container();
      },
      "modal": function() {
        return new App.Views.Modal();
      }
    };

    Main.prototype.events = {
      "click a[sref]": "gotoState"
    };

    Main.prototype.gotoState = function(event) {
      var url;
      url = $(event.currentTarget).attr("sref");
      Backbone.history.loadUrl(url);
      return event.preventDefault();
    };

    Main.prototype.toggleSidebar = function() {
      return this.views["container"].toggleSidebar();
    };

    Main.prototype.openSidebar = function() {
      return this.views["container"].openSidebar();
    };

    Main.prototype.closeSidebar = function() {
      return this.views["container"].closeSidebar();
    };

    Main.prototype.openModal = function(view) {
      return this.views["modal"].render(view).show();
    };

    Main.prototype.closeModal = function() {
      return this.views["modal"].hide();
    };

    Main.prototype.openPage = function(view) {
      return this.views["container"].render(view);
    };

    return Main;

  })(Backbone.View);

}).call(this);
