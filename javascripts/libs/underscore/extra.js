(function() {
  _.mixin({
    required: function(obj, key) {
      return _.tap(obj[key], function(value) {
        if (!value) {
          return _.error("Parameter '" + key + "' is required for ", obj);
        }
      });
    },
    deleted: function(obj, key) {
      return _.tap(obj[key], function() {
        return delete obj[key];
      });
    },
    loadTemplate: function(path) {
      var template;
      if (template = $("[id='" + path + "']").html()) {
        JST[path] = _.template(template);
      }
      return _.required(JST, path);
    },
    renderTemplate: function(path, options) {
      if (options == null) {
        options = {};
      }
      return _.loadTemplate(path)(options);
    },
    setDebugLevel: function(debugLevel) {
      var DebugLevelMap, level, method, methods, _results;
      DebugLevelMap = {
        0: ['debug', 'time', 'timeEnd'],
        1: ['info', 'log'],
        2: ['warn'],
        3: ['error', 'assert']
      };
      _results = [];
      for (level in DebugLevelMap) {
        methods = DebugLevelMap[level];
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = methods.length; _i < _len; _i++) {
            method = methods[_i];
            if (debugLevel <= level && (console[method] != null)) {
              _results1.push(_[method] = _.bind(console[method], console));
            } else {
              _results1.push(_[method] = _.noop);
            }
          }
          return _results1;
        })());
      }
      return _results;
    }
  });

  _.setDebugLevel(0);

}).call(this);
