(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.Container = (function(_super) {
    __extends(Container, _super);

    function Container() {
      this.onClickSidebarActive = __bind(this.onClickSidebarActive, this);
      return Container.__super__.constructor.apply(this, arguments);
    }

    Container.prototype.template = "";

    Container.prototype.afterRender = function(view, reverse) {
      if (reverse == null) {
        reverse = false;
      }
      if (view != null) {
        if (this.lastPage != null) {
          this.lastPage.remove();
        }
        this.lastPage = this.currPage;
        this.currPage = new App.Views.Page().render(view);
        this.currPage.$el.appendTo(this.$el);
        if (this.lastPage != null) {
          this.lastPage.hide();
          return this.currPage.show();
        }
      }
    };

    Container.prototype.onClickSidebarActive = function(event) {
      this.toggleSidebar();
      event.stopImmediatePropagation();
      return event.preventDefault();
    };

    Container.prototype.toggleSidebar = function() {
      this.$el.toggleClass("sidebar-active");
      if (this.$el.hasClass("sidebar-active")) {
        return this.$el.on("click", this.onClickSidebarActive);
      } else {
        return this.$el.off("click", this.onClickSidebarActive);
      }
    };

    return Container;

  })(Backbone.View);

}).call(this);
