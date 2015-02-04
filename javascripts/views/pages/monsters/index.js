(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.UnitsItem = (function(_super) {
    __extends(UnitsItem, _super);

    function UnitsItem() {
      return UnitsItem.__super__.constructor.apply(this, arguments);
    }

    UnitsItem.prototype.template = _.loadTemplate("templates/pages/units/item");

    UnitsItem.prototype.bindings = {
      "#life": "life",
      "#atk": "atk"
    };

    return UnitsItem;

  })(Backbone.View);

  App.Pages.UnitsIndex = (function(_super) {
    __extends(UnitsIndex, _super);

    function UnitsIndex() {
      return UnitsIndex.__super__.constructor.apply(this, arguments);
    }

    UnitsIndex.prototype.template = _.loadTemplate("templates/pages/units/index");

    UnitsIndex.prototype.store = {
      selector: ".table-view",
      template: App.Pages.UnitsItem,
      infinite: {
        container: ".content",
        slice: 10,
        suffix: true
      }
    };

    UnitsIndex.prototype.events = {
      "click .dropdown-toggle": "toggleDropdown",
      "click .dropdown-submenu > a": "triggerHover",
      "click .filter-reset": "resetFilter",
      "click .filter": "setFilter",
      "click .sort-mode": "setSortMode",
      "click .level-mode": "setLevelMode",
      "click .search-open": "openSearch",
      "click .search-close": "closeSearch"
    };

    UnitsIndex.prototype.beforeInitialize = function() {
      return this.filters = {};
    };

    UnitsIndex.prototype.afterRender = function() {
      var $content, $scroll;
      $content = this.$el.filter(".content");
      $scroll = this.$el.filter(".scroll-to-top");
      $scroll.click(function() {
        return $content.scrollToTop();
      });
      return this.$el.scroll(function(event) {
        if (event.target.scrollTop > 1000) {
          return $scroll.addClass("in");
        } else {
          return $scroll.removeClass("in");
        }
      });
    };

    UnitsIndex.prototype.triggerHover = function(event) {
      $(event.target).trigger('hover');
      return event.stopPropagation();
    };

    UnitsIndex.prototype.toggleDropdown = function(event) {
      var $dropdown;
      $dropdown = $(event.target).parent(".dropdown");
      if ($dropdown.hasClass("active")) {
        $dropdown.removeClass("active");
      } else {
        $(".dropdown.active").removeClass("active");
        $dropdown.addClass("active");
      }
      $dropdown.closest(".container").one("click", function() {
        return $dropdown.removeClass("active");
      });
      return event.stopPropagation();
    };

    UnitsIndex.prototype.openSearch = function(event) {
      var $children, $input, $search;
      $children = $(event.target).closest("header").children();
      $search = $children.filter(".input-search");
      $children.not($search).hide();
      $search.show();
      $input = $search.children("input");
      $input.trigger("focus").val("");
      return this.searchInterval = setInterval((function(_this) {
        return function() {
          var query;
          query = $input.val();
          return _this.search(query);
        };
      })(this), 200);
    };

    UnitsIndex.prototype.closeSearch = function(event) {
      var $children, $search;
      this.binder.filter(this.filters);
      if (this.searchInterval) {
        clearInterval(this.searchInterval);
      }
      $children = $(event.target).closest("header").children();
      $search = $children.filter(".input-search");
      $children.not($search).show();
      return $search.hide();
    };

    UnitsIndex.prototype.search = function(query) {
      if (query !== this.searchQuery) {
        this.binder.filter((function(_this) {
          return function(collection) {
            var models;
            models = _.isEmpty(_this.filters) ? collection.models : collection.where(_this.filters);
            if (query !== "") {
              models = _.filter(models, function(model) {
                var key, value, _i, _len, _ref;
                _ref = ["name", "title"];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  key = _ref[_i];
                  value = model.get(key);
                  if (value && value.indexOf(query) >= 0) {
                    return true;
                  }
                }
                return false;
              });
            }
            return models;
          };
        })(this));
        return this.searchQuery = query;
      }
    };

    UnitsIndex.prototype.resetFilter = function(event) {
      var $target, key;
      $target = $(event.target);
      this.removeAllActive($target);
      if (key = $target.data("key")) {
        delete this.filters[key];
      } else {
        this.filters = {};
      }
      return this.binder.filter(this.filters);
    };

    UnitsIndex.prototype.removeAllActive = function($target) {
      return $target.closest('.dropdown-menu').find('.active').removeClass('active');
    };

    UnitsIndex.prototype.setActive = function($target) {
      this.removeAllActive($target);
      return $target.parent('li').toggleClass("active");
    };

    UnitsIndex.prototype.setFilter = function(event) {
      var $target;
      $target = $(event.target);
      this.setActive($target);
      this.filters[$target.data("key")] = parseInt($target.data("value"));
      return this.binder.filter(this.filters);
    };

    UnitsIndex.prototype.setSortMode = function(event) {
      var $target, key;
      $target = $(event.target);
      this.setActive($target);
      key = $target.data("key");
      return this.binder.sort(function(model) {
        return -model.get(key);
      });
    };

    UnitsIndex.prototype.setLevelMode = function(event) {
      var $target, key;
      $target = $(event.target);
      this.setActive($target);
      key = $target.data("key");
      return this.binder.collection.each(function(model) {
        return model.setLevelMode(key);
      });
    };

    return UnitsIndex;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.MonstersIndex = (function(_super) {
    __extends(MonstersIndex, _super);

    function MonstersIndex() {
      return MonstersIndex.__super__.constructor.apply(this, arguments);
    }

    MonstersIndex.prototype.template = _.loadTemplate("templates/pages/monsters/index");

    MonstersIndex.prototype.store = _.extend({}, App.Pages.UnitsIndex.prototype.store, {
      template: _.loadTemplate("templates/pages/monsters/item")
    });

    return MonstersIndex;

  })(App.Pages.UnitsIndex);

}).call(this);
