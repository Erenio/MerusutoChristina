(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Collections.Familiars = (function(_super) {
    __extends(Familiars, _super);

    function Familiars() {
      return Familiars.__super__.constructor.apply(this, arguments);
    }

    Familiars.prototype.url = "data/familiars.json";

    Familiars.prototype.model = App.Models.Familiar;

    return Familiars;

  })(App.Collections.Companions);

}).call(this);
