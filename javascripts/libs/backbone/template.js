(function() {
  Backbone.Template = (function() {
    function Template(options) {
      this.$el = $(_.required(options, "el"));
    }

    Template.prototype.render = function() {
      return this;
    };

    Template.prototype.remove = function() {
      return this.$el.remove();
    };

    return Template;

  })();

}).call(this);
