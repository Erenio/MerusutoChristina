(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.FamiliarsShow = (function(_super) {
    __extends(FamiliarsShow, _super);

    function FamiliarsShow() {
      return FamiliarsShow.__super__.constructor.apply(this, arguments);
    }

    FamiliarsShow.prototype.template = _.loadTemplate("templates/modals/familiars/show");

    return FamiliarsShow;

  })(App.Pages.CompanionsShow);

}).call(this);
