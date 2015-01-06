(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.Sliders = (function(_super) {
    __extends(Sliders, _super);

    function Sliders() {
      return Sliders.__super__.constructor.apply(this, arguments);
    }

    Sliders.prototype.template = _.loadTemplate("templates/pages/sliders");

    Sliders.prototype.layout = {
      ".slider": function() {
        return new App.Widgets.Slider();
      }
    };

    return Sliders;

  })(Backbone.View);

}).call(this);
