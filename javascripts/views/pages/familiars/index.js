(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.FamiliarsIndex = (function(_super) {
    __extends(FamiliarsIndex, _super);

    function FamiliarsIndex() {
      return FamiliarsIndex.__super__.constructor.apply(this, arguments);
    }

    FamiliarsIndex.prototype.template = _.loadTemplate("templates/pages/familiars/index");

    FamiliarsIndex.prototype.store = _.extend({}, App.Pages.CompanionsIndex.prototype.store, {
      template: _.loadTemplate("templates/pages/familiars/item")
    });

    return FamiliarsIndex;

  })(App.Pages.CompanionsIndex);

}).call(this);
