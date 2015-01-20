(function() { this.JST || (this.JST = {}); this.JST["templates/modals/companions/show"] = function(__obj) {
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
        __out.push(_.renderTemplate("templates/modals/header"));
      
        __out.push('\n<div class="wrap">\n  <img class="image" src="');
      
        __out.push(__sanitize(this.model.originalUrl()));
      
        __out.push('">\n\n  <div class="media">\n    <div class="media-body">\n      <div class="media-info-group">\n        <p class="media-info">\n          生命：<span id="life">');
      
        __out.push(__sanitize(this.model.get("life")));
      
        __out.push('</span><br>\n          攻击：<span id="atk">');
      
        __out.push(__sanitize(this.model.get("atk")));
      
        __out.push('</span><br>\n          攻距：');
      
        __out.push(__sanitize(this.model.get("aarea")));
      
        __out.push('<br>\n          攻数：');
      
        __out.push(__sanitize(this.model.get("anum")));
      
        __out.push('<br>\n          攻速：');
      
        __out.push(__sanitize(this.model.get("aspd")));
      
        __out.push('<br>\n          韧性：');
      
        __out.push(__sanitize(this.model.get("tenacity")));
      
        __out.push('<br>\n          移速：');
      
        __out.push(__sanitize(this.model.get("mspd")));
      
        __out.push('<br>\n          成长：');
      
        __out.push(__sanitize(this.model.getTypeString()));
      
        __out.push('<br>\n        </p>\n        <p class="media-info">\n          火：');
      
        __out.push(__sanitize(Math.round(this.model.get("fire") * 100)));
      
        __out.push('%<br>\n          水：');
      
        __out.push(__sanitize(Math.round(this.model.get("aqua") * 100)));
      
        __out.push('%<br>\n          风：');
      
        __out.push(__sanitize(Math.round(this.model.get("wind") * 100)));
      
        __out.push('%<br>\n          光：');
      
        __out.push(__sanitize(Math.round(this.model.get("light") * 100)));
      
        __out.push('%<br>\n          暗：');
      
        __out.push(__sanitize(Math.round(this.model.get("dark") * 100)));
      
        __out.push('%<br><br>\n        </p>\n        <p class="media-info">\n          DPS：');
      
        __out.push(__sanitize(Math.round(this.model.get("dps"))));
      
        __out.push('<br>\n          MDPS：');
      
        __out.push(__sanitize(Math.round(this.model.get("mdps"))));
      
        __out.push('<br>\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
