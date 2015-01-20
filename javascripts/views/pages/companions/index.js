(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Pages.CompanionsItem = (function(_super) {
    __extends(CompanionsItem, _super);

    function CompanionsItem() {
      return CompanionsItem.__super__.constructor.apply(this, arguments);
    }

    CompanionsItem.prototype.template = _.loadTemplate("templates/pages/companions/item");

    CompanionsItem.prototype.bindings = {
      "#life": "life",
      "#atk": "atk"
    };

    return CompanionsItem;

  })(Backbone.View);

  App.Pages.CompanionsIndex = (function(_super) {
    __extends(CompanionsIndex, _super);

    function CompanionsIndex() {
      return CompanionsIndex.__super__.constructor.apply(this, arguments);
    }

    CompanionsIndex.prototype.template = _.loadTemplate("templates/pages/companions/index");

    CompanionsIndex.prototype.store = {
      selector: ".table-view",
      template: App.Pages.CompanionsItem,
      infinite: {
        container: ".content",
        slice: 10,
        suffix: true
      }
    };

    CompanionsIndex.prototype.events = {
      "click .dropdown-toggle": "toggleDropdown",
      "click .dropdown-submenu > a": "triggerHover",
      "click .filter-reset": "resetFilter",
      "click .filter": "setFilter",
      "click .sort-mode": "setSortMode",
      "click .level-mode": "setLevelMode",
      "click .search-open": "openSearch",
      "click .search-close": "closeSearch"
    };

    CompanionsIndex.prototype.beforeInitialize = function() {
      return this.filters = {};
    };

    CompanionsIndex.prototype.triggerHover = function(event) {
      $(event.target).trigger('hover');
      return event.stopPropagation();
    };

    CompanionsIndex.prototype.toggleDropdown = function(event) {
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

    CompanionsIndex.prototype.openSearch = function(event) {
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

    CompanionsIndex.prototype.closeSearch = function(event) {
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

    CompanionsIndex.prototype.search = function(query) {
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

    CompanionsIndex.prototype.resetFilter = function(event) {
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

    CompanionsIndex.prototype.removeAllActive = function($target) {
      return $target.closest('.dropdown-menu').find('.active').removeClass('active');
    };

    CompanionsIndex.prototype.setActive = function($target) {
      this.removeAllActive($target);
      return $target.parent('li').toggleClass("active");
    };

    CompanionsIndex.prototype.setFilter = function(event) {
      var $target;
      $target = $(event.target);
      this.setActive($target);
      this.filters[$target.data("key")] = parseInt($target.data("value"));
      return this.binder.filter(this.filters);
    };

    CompanionsIndex.prototype.setSortMode = function(event) {
      var $target, key;
      $target = $(event.target);
      this.setActive($target);
      key = $target.data("key");
      return this.binder.sort(function(model) {
        return -model.get(key);
      });
    };

    CompanionsIndex.prototype.setLevelMode = function(event) {
      var $target, key;
      $target = $(event.target);
      this.setActive($target);
      key = $target.data("key");
      return this.binder.collection.each(function(model) {
        return model.setLevelMode(key);
      });
    };

    return CompanionsIndex;

  })(Backbone.View);

}).call(this);
