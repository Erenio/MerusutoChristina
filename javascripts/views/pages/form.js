(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.Form = (function(_super) {
    __extends(Form, _super);

    function Form() {
      return Form.__super__.constructor.apply(this, arguments);
    }

    Form.prototype.template = _.loadTemplate("templates/modals/form");

    Form.prototype.bindings = {
      fullname: [
        {
          selector: "#fullname-input",
          event: "keyup"
        }, "#fullname"
      ],
      search: ["#search-input", "#search"],
      description: ["#description-textarea", "#description"],
      toggle: [new App.Bindings.Toggle("#toggle-toggle"), "#toggle"]
    };

    return Form;

  })(Backbone.View);

}).call(this);
