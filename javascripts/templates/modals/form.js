(function() { this.JST || (this.JST = {}); this.JST["templates/modals/form"] = function(__obj) {
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
        __out.push(_.renderTemplate("templates/modals/header", {
          title: "Form"
        }));
      
        __out.push('\n<div class="content">\n  <form class="content-padded">\n    <input type="text" placeholder="Full name" id="fullname-input">\n    <input type="search" placeholder="Search" id="search-input">\n    <textarea rows="5" id="description-textarea"></textarea>\n    <div class="input-toggle">\n      <label for="toggle">Toggle:</label>\n      <div class="toggle active" id="toggle-toggle">\n        <div class="toggle-handle"></div>\n      </div>\n    </div>\n    <button class="btn btn-positive btn-block">Submit</button>\n  </form>\n\n  <div class="content-padded">\n    <p>Full name: <span id="fullname"></span></p>\n    <p>Search: <span id="search"></span></p>\n    <p>Description: <span id="description"></span></p>\n    <p>Toggle: <span id="toggle"></span></p>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
