import { useEffect as A, Children as B, createElement as K, cloneElement as Z, useState as z, useRef as j } from "react";
function L(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var C, Q;
function V() {
  if (Q) return C;
  Q = 1;
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
  function F(r, l, f, O, x) {
    var b, g, y = 0;
    do
      g = l + (f - l) / 2, b = c(g, O, x) - r, b > 0 ? f = g : l = g;
    while (Math.abs(b) > t && ++y < a);
    return g;
  }
  function w(r, l, f, O) {
    for (var x = 0; x < n; ++x) {
      var b = d(l, f, O);
      if (b === 0)
        return l;
      var g = c(l, f, O) - r;
      l -= g / b;
    }
    return l;
  }
  function p(r) {
    return r;
  }
  return C = function(r, l, f, O) {
    if (!(0 <= r && r <= 1 && 0 <= f && f <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    if (r === l && f === O)
      return p;
    for (var x = h ? new Float32Array(i) : new Array(i), b = 0; b < i; ++b)
      x[b] = c(b * o, r, f);
    function g(y) {
      for (var S = 0, N = 1, k = i - 1; N !== k && x[N] <= y; ++N)
        S += o;
      --N;
      var $ = (y - x[N]) / (x[N + 1] - x[N]), v = S + $ * o, U = d(v, r, f);
      return U >= e ? w(y, v, r, f) : U === 0 ? v : F(y, S, S + o, r, f);
    }
    return function(y) {
      return y === 0 ? 0 : y === 1 ? 1 : c(g(y), l, O);
    };
  }, C;
}
var _ = V();
const q = /* @__PURE__ */ L(_), J = {
  outQuart: [0.165, 0.84, 0.44, 1]
}, E = {
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
    const t = { ...E, ...e };
    if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(t) !== JSON.stringify(E)) {
      const a = { method: t.onStart instanceof Function ? t.onStart : t.onStart.method, is: !1 };
      Object.keys(t.to).length > 0 && this.data.push({ ...t, onStart: a });
    }
    return this.eachResult = this.result = t.from, this;
  }
  add(e) {
    const t = { ...E, ...e }, { from: a, to: i, duration: o, delay: h, easing: s, onUpdate: u, onComplete: m, onStart: c } = t, d = {
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
    const { from: a, to: i, duration: o, delay: h, easing: s, onUpdate: u, onComplete: m, onStart: c } = t, d = a || this.result, F = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (h || 0), [w, p, r, l] = s, f = q(w, p, r, l), O = F / o;
    if (F < 0) {
      e(() => this.render());
      return;
    }
    if (Object.keys(c).length !== 0)
      if (c instanceof Function)
        c?.();
      else {
        const { method: g, is: y } = c;
        !y && g && (c.is = !0, g?.(d));
      }
    let x = {}, b = [];
    Object.entries(i).forEach((g) => {
      const [y, S] = g, N = Object.entries(d).filter((v) => v[0] === y);
      if (N.length === 0) {
        b.push(y);
        return;
      }
      const k = N.length > 0 ? N[0][1] : null;
      if (k === void 0) return;
      const $ = k + (S - k) * f(O);
      x[y] = $;
    }), b.forEach((g) => {
      console.warn(`[Tweener] property "${g}" is undefined.`);
    }), F < o ? (this.eachResult = { ...this.result, ...x }, u?.(this.eachResult), this.enable ? e(() => this.render()) : (this.result = { ...this.result, ...x }, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = { ...this.result, ...i }, this.data.shift(), m?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && e(() => this.render())) : this.playing = !1);
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
}, X = ["backgroundColor", "color", "borderColor"], Y = [
  "scale",
  "x",
  "y",
  "rotate",
  "rotateY",
  "rotateX",
  "rotateZ",
  "skewX",
  "skewY"
], M = {
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
}, T = (n, e) => X.filter((a) => a === n).length !== 0 ? W(e) : H(e), tt = (n) => {
  const e = {};
  return Object.entries(n).forEach((t) => {
    const [a, i] = t, o = Y.filter((h) => h === a);
    if (o.length > 0) {
      const [h] = o, u = Object.entries(M).filter((d) => d[0] === h)[0][1], c = Object.entries(I).filter((d) => d[0] === h)[0][1];
      e.transform ? e.transform += ` ${u}(${i}${c})` : e.transform = `${u}(${i}${c})`;
    } else e[a] = i;
  }), e;
}, D = (n, e) => {
  const t = {};
  return Object.entries(n).forEach((a) => {
    const [i, o] = a, [h, s] = i.split("@"), u = e[h], m = Y.filter((c) => c === i);
    if (u === "hsl")
      t[h] = { ...t[h], [s]: o };
    else if (m.length > 0) {
      const [c] = m, F = Object.entries(M).filter((r) => r[0] === c)[0][1], p = Object.entries(I).filter((r) => r[0] === c)[0][1];
      t.transform ? t.transform += ` ${F}(${o}${p})` : t.transform = `${F}(${o}${p})`;
    } else t[h] = `${o}${u}`;
  }), Object.entries(t).forEach((a) => {
    const [i, o] = a;
    if (X.filter((s) => s === i).length !== 0) {
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
}, R = {
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
  const [e, t] = z(n), a = j({}), i = j({}), o = () => {
    let s = {}, u = {};
    return Object.keys(a.current).length ? (s = a.current, u = i.current) : (Object.entries(e).forEach((m) => {
      const [c, d] = m, F = T(c, d);
      if (F) {
        const [w, p] = F;
        p === "hsl" ? Object.entries(w).forEach((r) => {
          const [l, f] = r;
          s[`${c}@${l}`] = f;
        }) : s[c] = w, u[c] = p;
      }
    }), i.current = u), { from: s, unit: u };
  }, h = j(new P({ from: o().from }));
  return [
    tt(e),
    (s, u) => {
      let m;
      typeof u == "number" ? m = { ...R, duration: u } : m = { ...R, ...u };
      const { from: c, unit: d } = o(), F = {};
      Object.entries(s).forEach((p) => {
        const [r, l] = p, f = T(r, l);
        if (f) {
          const [O, x] = f;
          x === "hsl" ? Object.entries(O).forEach((b) => {
            const [g, y] = b;
            F[`${r}@${g}`] = y;
          }) : F[r] = O;
        }
      }), h.current.stop().clearQueue().add({
        to: F,
        from: c,
        ...m,
        onUpdate: (p) => {
          a.current = p, t(D(p, d)), m.onUpdate(p);
        },
        onComplete: (p) => {
          a.current = p, t(D(p, d)), m.onEnd(p);
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
