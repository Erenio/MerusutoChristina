(function() {
  Backbone.View.Extension.Params = (function() {
    function Params() {}

    Params.prototype.initialize = function(view, options) {
      var param, value, _i, _len, _ref, _ref1, _results;
      _ref = view.params.required;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        view[param] = _.required(options, param);
      }
      _ref1 = view.params.optional;
      _results = [];
      for (param in _ref1) {
        value = _ref1[param];
        _results.push(view[param] = options[param] || value);
      }
      return _results;
    };

    return Params;

  })();

}).call(this);
