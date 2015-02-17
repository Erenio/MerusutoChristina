(function() { this.JST || (this.JST = {}); this.JST["templates/modals/units/show"] = function(__obj) {
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
      
        __out.push('\n<div class="content">\n  <div class="slider">\n    <div class="slide-group">\n      <div class="slide">\n        <img class="image" src="');
      
        __out.push(__sanitize(this.model.originalUrl()));
      
        __out.push('">\n      </div>\n      <div class="slide media">\n        <div class="media-body">\n          <h4 class="media-title media-info-group">\n            ');
      
        __out.push(__sanitize(this.model.get("title")));
      
        __out.push(' ');
      
        __out.push(__sanitize(this.model.get("name")));
      
        __out.push('\n            <small>');
      
        __out.push(__sanitize(this.model.getRareString()));
      
        __out.push('</small>\n          </h4>\n          <div class="media-info-group">\n            <p class="media-info">\n              初始生命：');
      
        __out.push(__sanitize(this.model.origin.life));
      
        __out.push('<br>\n              满级生命：');
      
        __out.push(__sanitize(this.model.calcMaxLv(this.model.origin.life)));
      
        __out.push('<br>\n              满觉生命：');
      
        __out.push(__sanitize(this.model.calcMaxLvAndGrow(this.model.origin.life)));
      
        __out.push('<br>\n              初始攻击：');
      
        __out.push(__sanitize(this.model.origin.atk));
      
        __out.push('<br>\n              满级攻击：');
      
        __out.push(__sanitize(this.model.calcMaxLv(this.model.origin.atk)));
      
        __out.push('<br>\n              满觉攻击：');
      
        __out.push(__sanitize(this.model.calcMaxLvAndGrow(this.model.origin.atk)));
      
        __out.push('<br>\n            </p>\n            <p class="media-info">\n              攻距：');
      
        __out.push(__sanitize(this.model.get("aarea")));
      
        __out.push('<br>\n              攻数：');
      
        __out.push(__sanitize(this.model.get("anum")));
      
        __out.push('<br>\n              攻速：');
      
        __out.push(__sanitize(this.model.get("aspd")));
      
        __out.push('<br>\n              韧性：');
      
        __out.push(__sanitize(this.model.get("tenacity")));
      
        __out.push('<br>\n              移速：');
      
        __out.push(__sanitize(this.model.get("mspd")));
      
        __out.push('<br>\n              成长：');
      
        __out.push(__sanitize(this.model.getTypeString()));
      
        __out.push('<br>\n            </p>\n          </div>\n          <div class="media-info-group">\n            <p class="media-info">\n              初始DPS：');
      
        __out.push(__sanitize(Math.round(this.model.origin.dps)));
      
        __out.push('<br>\n              满级DPS：');
      
        __out.push(__sanitize(Math.round(this.model.calcMaxLv(this.model.origin.dps))));
      
        __out.push('<br>\n              满觉DPS：');
      
        __out.push(__sanitize(Math.round(this.model.calcMaxLvAndGrow(this.model.origin.dps))));
      
        __out.push('<br>\n              初始总DPS：');
      
        __out.push(__sanitize(Math.round(this.model.origin.mdps)));
      
        __out.push('<br>\n              满级总DPS：');
      
        __out.push(__sanitize(Math.round(this.model.calcMaxLv(this.model.origin.mdps))));
      
        __out.push('<br>\n              满觉总DPS：');
      
        __out.push(__sanitize(Math.round(this.model.calcMaxLvAndGrow(this.model.origin.mdps))));
      
        __out.push('<br>\n            </p>\n            <p class="media-info">\n              国家：');
      
        __out.push(__sanitize(this.model.get('country')));
      
        __out.push('<br>\n              火：');
      
        __out.push(__sanitize(Math.round(this.model.get("fire") * 100)));
      
        __out.push('%<br>\n              水：');
      
        __out.push(__sanitize(Math.round(this.model.get("aqua") * 100)));
      
        __out.push('%<br>\n              风：');
      
        __out.push(__sanitize(Math.round(this.model.get("wind") * 100)));
      
        __out.push('%<br>\n              光：');
      
        __out.push(__sanitize(Math.round(this.model.get("light") * 100)));
      
        __out.push('%<br>\n              暗：');
      
        __out.push(__sanitize(Math.round(this.model.get("dark") * 100)));
      
        __out.push('%<br>\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);