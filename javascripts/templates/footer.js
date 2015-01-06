(function() { this.JST || (this.JST = {}); this.JST["templates/footer"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<footer class="bar bar-tab">\n  <a class="tab-item" href="#pages/typography">\n    <span class="icon icon-code"></span>\n    <span class="tab-label">Typography</span>\n  </a>\n  <a class="tab-item" href="#pages/tableview">\n    <span class="icon icon-list"></span>\n    <span class="tab-label">Table View</span>\n  </a>\n  <a class="tab-item" href="#pages/sliders">\n    <span class="icon icon-pages"></span>\n    <span class="tab-label">Sliders</span>\n  </a>\n  <a class="tab-item" href="#pages/blockbuttons">\n    <span class="icon icon-more"></span>\n    <span class="tab-label">Buttons</span>\n  </a>\n</footer>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
