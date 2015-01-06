(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.Tableview = (function(_super) {
    __extends(Tableview, _super);

    function Tableview() {
      return Tableview.__super__.constructor.apply(this, arguments);
    }

    Tableview.prototype.template = _.loadTemplate("templates/pages/tableview/index");

    Tableview.prototype.store = {
      selector: ".table-view",
      template: _.loadTemplate("templates/pages/tableview/show")
    };

    Tableview.prototype.events = {
      "click .btn-add": "add",
      "click .btn-sort": "sort",
      "click .btn-reset": "reset",
      "click .btn-remove": "remove"
    };

    Tableview.prototype.add = function() {
      var model;
      model = new Backbone.Model({
        title: "Item " + (Math.floor(Math.random() * 10))
      });
      return this.collection.add(model, {
        sort: false
      });
    };

    Tableview.prototype.sort = function() {
      this.collection.comparator = "title";
      return this.collection.sort();
    };

    Tableview.prototype.reset = function() {
      return this.collection.reset([
        new Backbone.Model({
          title: "Item 3"
        }), new Backbone.Model({
          title: "Item 2"
        }), new Backbone.Model({
          title: "Item 1"
        })
      ], {
        sort: false
      });
    };

    Tableview.prototype.remove = function() {
      var model;
      model = this.collection.at(0);
      return this.collection.remove(model);
    };

    return Tableview;

  })(Backbone.View);

}).call(this);
