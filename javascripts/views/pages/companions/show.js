(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.CompanionsShow = (function(_super) {
    __extends(CompanionsShow, _super);

    function CompanionsShow() {
      return CompanionsShow.__super__.constructor.apply(this, arguments);
    }

    CompanionsShow.prototype.template = _.loadTemplate("templates/modals/companions/show");

    CompanionsShow.prototype.afterRender = function() {};

    CompanionsShow.prototype.beforeRemove = function() {};

    return CompanionsShow;

  })(Backbone.View);

}).call(this);
