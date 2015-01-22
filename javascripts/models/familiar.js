(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Models.Familiar = (function(_super) {
    __extends(Familiar, _super);

    function Familiar() {
      return Familiar.__super__.constructor.apply(this, arguments);
    }

    Familiar.prototype.initialize = function(attributes, options) {
      this.origin = {
        atk: attributes.atk,
        life: attributes.life
      };
      return this.setLevelMode("zero");
    };

    Familiar.prototype.setLevelMode = function(mode) {
      var atk, dps, life, mdps;
      switch (mode) {
        case "zero":
          atk = this.origin.atk;
          life = this.origin.life;
      }
      dps = atk / this.get("aspd");
      mdps = dps * this.get("anum");
      this.set("atk", atk);
      this.set("life", life);
      this.set("dps", dps);
      return this.set("mdps", mdps);
    };

    Familiar.prototype.imageUrl = function(type) {
      return "data/familiars/" + type + "/" + this.id + ".png";
    };

    Familiar.prototype.getSkinString = function() {
      return this.getString(["坚硬", "常规", "柔软"], "skin");
    };

    return Familiar;

  })(App.Models.Companion);

}).call(this);
