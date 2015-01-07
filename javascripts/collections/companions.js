(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Collections.Companions = (function(_super) {
    __extends(Companions, _super);

    function Companions() {
      return Companions.__super__.constructor.apply(this, arguments);
    }

    Companions.prototype.url = "data/companions.json";

    Companions.prototype.model = App.Models.Companion;

    Companions.prototype.initialize = function() {
      return this.comparator = function(model) {
        return -model.get("rare");
      };
    };

    return Companions;

  })(Backbone.Collection);

}).call(this);
