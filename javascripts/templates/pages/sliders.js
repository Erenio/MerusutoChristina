(function() { this.JST || (this.JST = {}); this.JST["templates/pages/sliders"] = function(__obj) {
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
        __out.push(_.renderTemplate("templates/pages/header", {
          title: "Sliders"
        }));
      
        __out.push('\n<div class="content">\n  <div class="slider">\n    <div class="slide-group">\n      <div class="slide">\n        <img src="images/slide-1.jpg">\n        <span class="slide-text">\n          <span class="icon icon-left-nav"></span>\n          Slide me\n        </span>\n      </div>\n      <div class="slide">\n        <img src="images/slide-2.jpg">\n      </div>\n      <div class="slide">\n        <img src="images/slide-3.jpg">\n      </div>\n    </div>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
