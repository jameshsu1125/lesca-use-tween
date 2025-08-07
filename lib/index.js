import { useEffect as A, Children as B, createElement as K, cloneElement as Z, useState as z, useRef as $ } from "react";
function L(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var j, U;
function V() {
  if (U) return j;
  U = 1;
  var n = 4, e = 1e-3, t = 1e-7, a = 10, i = 11, o = 1 / (i - 1), h = typeof Float32Array == "function";
  function s(r, l) {
    return 1 - 3 * l + 3 * r;
  }
  function u(r, l) {
    return 3 * l - 6 * r;
  }
  function m(r) {
    return 3 * r;
  }
  function c(r, l, f) {
    return ((s(l, f) * r + u(l, f)) * r + m(l)) * r;
  }
  function d(r, l, f) {
    return 3 * s(l, f) * r * r + 2 * u(l, f) * r + m(l);
  }
  function b(r, l, f, F, g) {
    var y, x, O = 0;
    do
      x = l + (f - l) / 2, y = c(x, F, g) - r, y > 0 ? f = x : l = x;
    while (Math.abs(y) > t && ++O < a);
    return x;
  }
  function S(r, l, f, F) {
    for (var g = 0; g < n; ++g) {
      var y = d(l, f, F);
      if (y === 0)
        return l;
      var x = c(l, f, F) - r;
      l -= x / y;
    }
    return l;
  }
  function p(r) {
    return r;
  }
  return j = function(r, l, f, F) {
    if (!(0 <= r && r <= 1 && 0 <= f && f <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (r === l && f === F)
      return p;
    for (var g = h ? new Float32Array(i) : new Array(i), y = 0; y < i; ++y)
      g[y] = c(y * o, r, f);
    function x(O) {
      for (var w = 0, N = 1, k = i - 1; N !== k && g[N] <= O; ++N)
        w += o;
      --N;
      var M = (O - g[N]) / (g[N + 1] - g[N]), v = w + M * o, E = d(v, r, f);
      return E >= e ? S(O, v, r, f) : E === 0 ? v : b(O, w, w + o, r, f);
    }
    return function(O) {
      return O === 0 ? 0 : O === 1 ? 1 : c(x(O), l, F);
    };
  }, j;
}
var _ = V();
const q = /* @__PURE__ */ L(_), J = {
  outQuart: [0.165, 0.84, 0.44, 1]
}, C = {
  from: {},
  to: {},
  duration: 1e3,
  delay: 0,
  easing: J.outQuart,
  onStart: {
    is: !1,
    method: () => {
    }
  },
  onUpdate: () => {
  },
  onComplete: () => {
  }
};
class P {
  enable;
  data;
  playing;
  clearNextFrame;
  playNextFrame;
  addDataNextFrame;
  eachResult;
  result;
  timestamp;
  /**
   * { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @param {object} options { from, to, duration, delay, easing, onUpdate, onComplete, onStart }
   * @returns
   */
  constructor(e) {
    const t = { ...C, ...e };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(t) !== JSON.stringify(C)) {
      const a = { method: t.onStart instanceof Function ? t.onStart : t.onStart.method, is: !1 };
      Object.keys(t.to).length > 0 && this.data.push({ ...t, onStart: a });
    }
    return this.eachResult = this.result = t.from, this;
  }
  add(e) {
    const t = { ...C, ...e }, { from: a, to: i, duration: o, delay: h, easing: s, onUpdate: u, onComplete: m, onStart: c } = t, d = {
      from: a,
      to: i,
      duration: o,
      delay: h,
      easing: s,
      onUpdate: u,
      onComplete: m,
      onStart: c || { method: () => {
      }, is: !0 }
    };
    return e.onStart ? d.onStart = { method: c instanceof Function ? c : c.method, is: !1 } : d.onStart = { method: () => {
    }, is: !0 }, this.clearNextFrame && this.addDataNextFrame.push(d), this.data.push(d), this;
  }
  clearQueue() {
    return this.data.length > 0 && (this.clearNextFrame = !0), this.data = [], this.addDataNextFrame = [], this.result = this.eachResult, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), this;
  }
  play() {
    const { requestAnimationFrame: e } = window, [t] = this.data;
    if (t) {
      if (this.clearNextFrame) {
        this.playNextFrame = !0;
        return;
      }
      if (!this.playing)
        return this.playing = !0, this.enable = !0, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), e(() => this.render()), this;
    }
  }
  stop() {
    return this.enable = !1, this.playing = !1, this;
  }
  render() {
    const { requestAnimationFrame: e } = window, [t] = this.data;
    if (!t) return;
    const { from: a, to: i, duration: o, delay: h, easing: s, onUpdate: u, onComplete: m, onStart: c } = t, d = a || this.result, b = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (h || 0), [S, p, r, l] = s, f = q(S, p, r, l), F = b / o;
    if (b < 0) {
      e(() => this.render());
      return;
    }
    if (Object.keys(c).length !== 0)
      if (c instanceof Function)
        c?.();
      else {
        const { method: y, is: x } = c;
        !x && y && (c.is = !0, y?.(d));
      }
    let g = {};
    Object.entries(i).forEach((y) => {
      const [x, O] = y, w = Object.entries(d).filter((k) => k[0] === x)[0][1];
      if (w === void 0) return;
      const N = w + (O - w) * f(F);
      g[x] = N;
    }), b < o ? (this.eachResult = { ...this.result, ...g }, u?.(this.eachResult), this.enable ? e(() => this.render()) : (this.result = { ...this.result, ...g }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...i }, this.data.shift(), m?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && e(() => this.render())) : this.playing = !1);
  }
  reset() {
    this.timestamp = (/* @__PURE__ */ new Date()).getTime();
  }
}
const G = (n) => {
  let e = 0, t = 0, a = 0;
  n.length == 4 ? (e = "0x" + n[1] + n[1], t = "0x" + n[2] + n[2], a = "0x" + n[3] + n[3]) : n.length == 7 && (e = "0x" + n[1] + n[2], t = "0x" + n[3] + n[4], a = "0x" + n[5] + n[6]), e /= 255, t /= 255, a /= 255;
  let i = Math.min(e, t, a), o = Math.max(e, t, a), h = o - i, s = 0, u = 0, m = 0;
  return h == 0 ? s = 0 : o == e ? s = (t - a) / h % 6 : o == t ? s = (a - e) / h + 2 : s = (e - t) / h + 4, s = Math.round(s * 60), s < 0 && (s += 360), m = (o + i) / 2, u = h == 0 ? 0 : h / (1 - Math.abs(2 * m - 1)), u = +(u * 100).toFixed(1), m = +(m * 100).toFixed(1), [s, u, m];
}, R = ["backgroundColor", "color", "borderColor"], X = [
  "scale",
  "x",
  "y",
  "rotate",
  "rotateY",
  "rotateX",
  "rotateZ",
  "skewX",
  "skewY"
], Y = {
  scale: "scale",
  rotate: "rotate",
  x: "translateX",
  y: "translateY",
  skewX: "skewX",
  skewY: "skewY",
  rotateY: "rotateY",
  rotateX: "rotateX",
  rotateZ: "rotateZ"
}, I = {
  scale: "",
  rotate: "deg",
  x: "px",
  y: "px",
  skewX: "deg",
  skewY: "deg",
  rotateY: "deg",
  rotateX: "deg",
  rotateZ: "deg"
}, W = (n) => {
  const e = G(n), [t, a, i] = e;
  return [{ h: t, s: a, l: i }, "hsl"];
}, H = (n) => {
  const e = String(n), t = parseFloat(e), a = e.split(String(t)).join("");
  return isNaN(t) ? [Number(n), ""] : [t, a];
}, Q = (n, e) => R.filter((a) => a === n).length !== 0 ? W(e) : H(e), tt = (n) => {
  const e = {};
  return Object.entries(n).forEach((t) => {
    const [a, i] = t, o = X.filter((h) => h === a);
    if (o.length > 0) {
      const [h] = o, u = Object.entries(Y).filter((d) => d[0] === h)[0][1], c = Object.entries(I).filter((d) => d[0] === h)[0][1];
      e.transform ? e.transform += ` ${u}(${i}${c})` : e.transform = `${u}(${i}${c})`;
    } else e[a] = i;
  }), e;
}, T = (n, e) => {
  const t = {};
  return Object.entries(n).forEach((a) => {
    const [i, o] = a, [h, s] = i.split("@"), u = e[h], m = X.filter((c) => c === i);
    if (u === "hsl")
      t[h] = { ...t[h], [s]: o };
    else if (m.length > 0) {
      const [c] = m, b = Object.entries(Y).filter((r) => r[0] === c)[0][1], p = Object.entries(I).filter((r) => r[0] === c)[0][1];
      t.transform ? t.transform += ` ${b}(${o}${p})` : t.transform = `${b}(${o}${p})`;
    } else t[h] = `${o}${u}`;
  }), Object.entries(t).forEach((a) => {
    const [i, o] = a;
    if (R.filter((s) => s === i).length !== 0) {
      const s = o;
      o instanceof Object && (t[i] = `hsl(${s.h}, ${s.s}%, ${s.l}%)`);
    }
  }), t;
}, et = {
  // basic
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  // Sine
  inSine: [0.47, 0, 0.745, 0.715],
  outSine: [0.39, 0.575, 0.565, 1],
  inOutSine: [0.445, 0.05, 0.55, 0.95],
  // Cubic
  inCubic: [0.55, 0.055, 0.675, 0.19],
  outCubic: [0.215, 0.61, 0.355, 1],
  inOutCubic: [0.645, 0.045, 0.355, 1],
  // Quint
  InQuint: [0.755, 0.05, 0.855, 0.06],
  OutQuint: [0.23, 1, 0.32, 1],
  InOutQuint: [0.86, 0, 0.07, 1],
  // Circ
  inCirc: [0.6, 0.04, 0.98, 0.335],
  outCirc: [0.075, 0.82, 0.165, 1],
  inOutCirc: [0.785, 0.135, 0.15, 0.86],
  // Quad
  inQuad: [0.55, 0.085, 0.68, 0.53],
  outQuad: [0.25, 0.46, 0.45, 0.94],
  inOutQuad: [0.455, 0.03, 0.515, 0.955],
  // Quart
  inQuart: [0.895, 0.03, 0.685, 0.22],
  outQuart: [0.165, 0.84, 0.44, 1],
  inOutQuart: [0.77, 0, 0.175, 1],
  // Expo
  inExpo: [0.95, 0.05, 0.795, 0.035],
  outExpo: [0.19, 1, 0.22, 1],
  inOutExpo: [1, 0, 0, 1],
  // Back
  inBack: [0.6, -0.28, 0.735, 0.045],
  outBack: [0.175, 0.885, 0.32, 1.275],
  inOutBack: [0.68, -0.55, 0.265, 1.55]
}, D = {
  duration: 1e3,
  easing: et.outQuart,
  delay: 0,
  onStart: () => {
  },
  onUpdate: () => {
  },
  onEnd: () => {
  }
}, rt = (n) => {
  const [e, t] = z(n), a = $({}), i = $({}), o = () => {
    let s = {}, u = {};
    return Object.keys(a.current).length ? (s = a.current, u = i.current) : (Object.entries(e).forEach((m) => {
      const [c, d] = m, b = Q(c, d);
      if (b) {
        const [S, p] = b;
        p === "hsl" ? Object.entries(S).forEach((r) => {
          const [l, f] = r;
          s[`${c}@${l}`] = f;
        }) : s[c] = S, u[c] = p;
      }
    }), i.current = u), { from: s, unit: u };
  }, h = $(new P({ from: o().from }));
  return [
    tt(e),
    (s, u) => {
      let m;
      typeof u == "number" ? m = { ...D, duration: u } : m = { ...D, ...u };
      const { from: c, unit: d } = o(), b = {};
      Object.entries(s).forEach((p) => {
        const [r, l] = p, f = Q(r, l);
        if (f) {
          const [F, g] = f;
          g === "hsl" ? Object.entries(F).forEach((y) => {
            const [x, O] = y;
            b[`${r}@${x}`] = O;
          }) : b[r] = F;
        }
      }), h.current.stop().clearQueue().add({
        to: b,
        from: c,
        ...m,
        onUpdate: (p) => {
          a.current = p, t(T(p, d)), m.onUpdate(p);
        },
        onComplete: (p) => {
          a.current = p, t(T(p, d)), m.onEnd(p);
        }
      }).play();
    },
    () => {
      h.current?.stop();
    }
  ];
}, st = ({
  children: n,
  initStyle: e,
  tweenStyle: t,
  options: a = { duration: 1e3 }
}) => {
  const [i, o, h] = rt(e);
  return A(() => (t && o(t, a), () => h()), [t]), B.map(n, (s) => {
    if (typeof s == "string") return K("div", { style: i, children: s });
    const u = s;
    return Z(u, { ...u.props, style: { ...u.props.style, ...i } });
  });
};
export {
  et as Bezier,
  st as TweenProvider,
  P as Tweener,
  rt as default,
  rt as useTween
};
