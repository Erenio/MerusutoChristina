(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Models.Companion = (function(_super) {
    __extends(Companion, _super);

    function Companion() {
      return Companion.__super__.constructor.apply(this, arguments);
    }

    Companion.prototype.initialize = function(attributes, options) {
      this.origin = {
        atk: attributes.atk,
        life: attributes.life
      };
      return this.setLevelMode("zero");
    };

    Companion.prototype.calcF = function() {
      return this.f || (this.f = 1.8 + 0.1 * this.get("type"));
    };

    Companion.prototype.calcMaxLv = function(value) {
      return Math.floor(value * this.calcF());
    };

    Companion.prototype.calcMaxLvAndGrow = function(value) {
      var f, growPart, levelPart, rare;
      f = this.calcF();
      rare = this.get("rare");
      levelPart = Math.floor(value * f);
      growPart = Math.floor(value * (f - 1) / (19 + 10 * rare)) * 5 * (rare === 1 ? 5 : 15);
      return levelPart + growPart;
    };

    Companion.prototype.setLevelMode = function(mode) {
      var atk, dps, life, mdps;
      switch (mode) {
        case "zero":
          atk = this.origin.atk;
          life = this.origin.life;
          break;
        case "mxlv":
          atk = this.calcMaxLv(this.origin.atk);
          life = this.calcMaxLv(this.origin.life);
          break;
        case "mxlvgr":
          atk = this.calcMaxLvAndGrow(this.origin.atk);
          life = this.calcMaxLvAndGrow(this.origin.life);
      }
      dps = atk / this.get("aspd");
      mdps = dps * this.get("anum");
      this.set("atk", atk);
      this.set("life", life);
      this.set("dps", dps);
      return this.set("mdps", mdps);
    };

    Companion.prototype.imageUrl = function(type) {
      return "data/companions/" + type + "/" + this.id + ".png";
    };

    Companion.prototype.thumbnailUrl = function() {
      return this.imageUrl("thumbnail");
    };

    Companion.prototype.originalUrl = function() {
      return this.imageUrl("original");
    };

    Companion.prototype.getString = function(strs, key) {
      return strs[this.get(key) - 1];
    };

    Companion.prototype.getRareString = function() {
      return this.getString(["★", "★★", "★★★", "★★★★", "★★★★★"], "rare");
    };

    Companion.prototype.getElementKey = function() {
      return this.getString(["fire", "aqua", "wind", "light", "dark"], "element");
    };

    Companion.prototype.getTypeString = function() {
      return this.getString(["早熟", "平均", "晚成"], "type");
    };

    Companion.prototype.getElementPolygonPointsString = function(l, r) {
      var c, es, ps;
      es = [this.get("fire"), this.get("aqua"), this.get("wind"), this.get("light"), this.get("dark")];
      c = {
        x: l / 2,
        y: l / 2
      };
      ps = _.map([0, 1, 2, 3, 4], function(i) {
        var a;
        a = (i * 72 - 90) * (Math.PI * 2) / 360;
        return {
          x: c.x + Math.cos(a) * r * es[i],
          y: c.y + Math.sin(a) * r * es[i]
        };
      });
      return App.Utils.SVG.getPolygonPointsString(ps);
    };

    return Companion;

  })(Backbone.Model);

}).call(this);
