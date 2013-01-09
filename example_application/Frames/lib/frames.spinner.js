// Generated by CoffeeScript 1.4.0

goog.provide("FRAMES.spinner");

(function(window, document, undefined_) {
  /*
    Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
    Licensed under the MIT license
  */

  /*
    Utility function to create elements. If no tag name is given,
    a DIV is created. Optionally properties can be passed.
  */

  var Spinner, addAnimation, animations, createEl, css, defaults, ins, merge, pos, prefixes, sheet, useCssAnimations, vendor;
  createEl = function(tag, prop) {
    var el, n;
    el = document.createElement(tag || "div");
    n = void 0;
    for (n in prop) {
      el[n] = prop[n];
    }
    return el;
  };
  /*
    Appends children and returns the parent.
  */

  ins = function(parent) {
    var i, n;
    i = 1;
    n = arguments.length;
    while (i < n) {
      parent.appendChild(arguments[i]);
      i++;
    }
    return parent;
  };
  /*
    Insert a new stylesheet to hold the @keyframe or VML rules.
  */

  /*
    Creates an opacity keyframe animation rule and returns its name.
    Since most mobile Webkits have timing issues with animation-delay,
    we create separate rules for each line/segment.
  */

  addAnimation = function(alpha, trail, i, lines) {
    var name, pre, prefix, start, z;
    name = ["opacity", trail, ~~(alpha * 100), i, lines].join("-");
    start = 0.01 + i / lines * 100;
    z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha);
    prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase();
    pre = prefix && "-" + prefix + "-" || "";
    if (!animations[name]) {
      sheet.insertRule("@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + 0.01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", sheet.cssRules.length);
      animations[name] = 1;
    }
    return name;
  };
  /*
    Tries various vendor prefixes and returns the first supported property.
  */

  vendor = function(el, prop) {
    var i, pp, s;
    s = el.style;
    pp = void 0;
    i = void 0;
    if (s[prop] !== undefined) {
      return prop;
    }
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    i = 0;
    while (i < prefixes.length) {
      pp = prefixes[i] + prop;
      if (s[pp] !== undefined) {
        return pp;
      }
      i++;
    }
  };
  /*
    Sets multiple style properties at once.
  */

  css = function(el, prop) {
    var n;
    for (n in prop) {
      el.style[vendor(el, n) || n] = prop[n];
    }
    return el;
  };
  /*
    Fills in default values.
  */

  merge = function(obj) {
    var def, i, n;
    i = 1;
    while (i < arguments.length) {
      def = arguments[i];
      for (n in def) {
        if (obj[n] === undefined) {
          obj[n] = def[n];
        }
      }
      i++;
    }
    return obj;
  };
  /*
    Returns the absolute page-offset of the given element.
  */

  pos = function(el) {
    var o;
    o = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    while ((el = el.offsetParent)) {
      o.x += el.offsetLeft;
      o.y += el.offsetTop;
    }
    return o;
  };
  prefixes = ["webkit", "Moz", "ms", "O"];
  animations = {};
  useCssAnimations = void 0;
  sheet = function() {
    var el;
    el = createEl("style", {
      type: "text/css"
    });
    ins(document.getElementsByTagName("head")[0], el);
    return el.sheet || el.styleSheet;
  };
  sheet();
  defaults = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    rotate: 0,
    corners: 1,
    color: "#000",
    speed: 1,
    trail: 100,
    opacity: 1 / 4,
    fps: 20,
    zIndex: 2e9,
    className: "spinner",
    top: "auto",
    left: "auto",
    position: "relative"
  };
  /*
    The constructor
  */

  Spinner = Spinner = function(o) {
    if (!this.spin) {
      return new Spinner(o);
    }
    return this.opts = merge(o || {}, Spinner.defaults, defaults);
  };
  Spinner.defaults = {};
  merge(Spinner.prototype, {
    spin: function(target) {
      var anim, astep, el, ep, f, fps, i, mid, o, ostep, self, tp;
      this.stop();
      self = this;
      o = self.opts;
      el = self.el = css(createEl(0, {
        className: o.className
      }), {
        position: o.position,
        width: 0,
        zIndex: o.zIndex
      });
      mid = o.radius + o.length + o.width;
      ep = void 0;
      tp = void 0;
      if (target) {
        target.insertBefore(el, target.firstChild || null);
        tp = pos(target);
        ep = pos(el);
        css(el, {
          left: (o.left === "auto" ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + "px",
          top: (o.top === "auto" ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + "px"
        });
      }
      el.setAttribute("aria-role", "progressbar");
      self.lines(el, self.opts);
      if (!useCssAnimations) {
        i = 0;
        fps = o.fps;
        f = fps / o.speed;
        ostep = (1 - o.opacity) / (f * o.trail / 100);
        astep = f / o.lines;
        (anim = function() {
          var alpha, s;
          i++;
          s = o.lines;
          while (s) {
            alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity);
            self.opacity(el, o.lines - s, alpha, o);
            s--;
          }
          return self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
        })();
      }
      return self;
    },
    stop: function() {
      var el;
      el = this.el;
      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        this.el = undefined;
      }
      return this;
    },
    lines: function(el, o) {
      var fill, i, seg;
      fill = function(color, shadow) {
        return css(createEl(), {
          position: "absolute",
          width: (o.length + o.width) + "px",
          height: o.width + "px",
          background: color,
          boxShadow: shadow,
          transformOrigin: "left",
          transform: "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px" + ",0)",
          borderRadius: (o.corners * o.width >> 1) + "px"
        });
      };
      i = 0;
      seg = void 0;
      while (i < o.lines) {
        seg = css(createEl(), {
          position: "absolute",
          top: 1 + ~(o.width / 2) + "px",
          transform: (o.hwaccel ? "translate3d(0,0,0)" : ""),
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + " " + 1 / o.speed + "s linear infinite"
        });
        if (o.shadow) {
          ins(seg, css(fill("#000", "0 0 4px " + "#000"), {
            top: 2 + "px"
          }));
        }
        ins(el, ins(seg, fill(o.color, "0 0 1px rgba(0,0,0,.1)")));
        i++;
      }
      return el;
    },
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) {
        return el.childNodes[i].style.opacity = val;
      }
    }
  });
  /*
    Check and init VML support
  */

  (function() {
    var s, vml;
    vml = function(tag, attr) {
      return createEl("<" + tag + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"spin-vml\">", attr);
    };
    s = css(createEl("group"), {
      behavior: "url(#default#VML)"
    });
    if (!vendor(s, "transform") && s.adj) {
      sheet.addRule(".spin-vml", "behavior:url(#default#VML)");
      Spinner.prototype.lines = function(el, o) {
        var g, grp, i, margin, r, seg;
        grp = function() {
          return css(vml("group", {
            coordsize: s + " " + s,
            coordorigin: -r + " " + -r
          }), {
            width: s,
            height: s
          });
        };
        seg = function(i, dx, filter) {
          return ins(g, ins(css(grp(), {
            rotation: 360 / o.lines * i + "deg",
            left: ~~dx
          }), ins(css(vml("roundrect", {
            arcsize: o.corners
          }), {
            width: r,
            height: o.width,
            left: o.radius,
            top: -o.width >> 1,
            filter: filter
          }), vml("fill", {
            color: o.color,
            opacity: o.opacity
          }), vml("stroke", {
            opacity: 0
          }))));
        };
        r = o.length + o.width;
        s = 2 * r;
        margin = -(o.width + o.length) * 2 + "px";
        g = css(grp(), {
          position: "absolute",
          top: margin,
          left: margin
        });
        i = void 0;
        if (o.shadow) {
          i = 1;
          while (i <= o.lines) {
            seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            i++;
          }
        }
        i = 1;
        while (i <= o.lines) {
          seg(i);
          i++;
        }
        return ins(el, g);
      };
      return Spinner.prototype.opacity = function(el, i, val, o) {
        var c;
        c = el.firstChild;
        o = o.shadow && o.lines || 0;
        if (c && i + o < c.childNodes.length) {
          c = c.childNodes[i + o];
          c = c && c.firstChild;
          c = c && c.firstChild;
          if (c) {
            return c.opacity = val;
          }
        }
      };
    } else {
      return useCssAnimations = vendor(s, "animation");
    }
  })();
  if (typeof define === "function" && define.amd) {
    return define(function() {
      return Spinner;
    });
  } else {
    return window.Spinner = Spinner;
  }
})(window, document);
