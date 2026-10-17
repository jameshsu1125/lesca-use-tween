import { Children as e, cloneElement as t, createElement as n, useEffect as r, useRef as i, useState as a } from "react";
//#region node_modules/lesca-object-tweener/lib/index.js
function o(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var s, c;
function l() {
	if (c) return s;
	c = 1;
	var e = 4, t = .001, n = 1e-7, r = 10, i = 11, a = 1 / (i - 1), o = typeof Float32Array == "function";
	function l(e, t) {
		return 1 - 3 * t + 3 * e;
	}
	function u(e, t) {
		return 3 * t - 6 * e;
	}
	function d(e) {
		return 3 * e;
	}
	function f(e, t, n) {
		return ((l(t, n) * e + u(t, n)) * e + d(t)) * e;
	}
	function p(e, t, n) {
		return 3 * l(t, n) * e * e + 2 * u(t, n) * e + d(t);
	}
	function m(e, t, i, a, o) {
		var s, c, l = 0;
		do
			c = t + (i - t) / 2, s = f(c, a, o) - e, s > 0 ? i = c : t = c;
		while (Math.abs(s) > n && ++l < r);
		return c;
	}
	function h(t, n, r, i) {
		for (var a = 0; a < e; ++a) {
			var o = p(n, r, i);
			if (o === 0) return n;
			var s = f(n, r, i) - t;
			n -= s / o;
		}
		return n;
	}
	function g(e) {
		return e;
	}
	return s = function(e, n, r, s) {
		if (!(0 <= e && e <= 1 && 0 <= r && r <= 1)) throw Error("bezier x values must be in [0, 1] range");
		if (e === n && r === s) return g;
		for (var c = o ? new Float32Array(i) : Array(i), l = 0; l < i; ++l) c[l] = f(l * a, e, r);
		function u(n) {
			for (var o = 0, s = 1, l = i - 1; s !== l && c[s] <= n; ++s) o += a;
			--s;
			var u = (n - c[s]) / (c[s + 1] - c[s]), d = o + u * a, f = p(d, e, r);
			return f >= t ? h(n, d, e, r) : f === 0 ? d : m(n, o, o + a, e, r);
		}
		return function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : f(u(e), n, s);
		};
	}, s;
}
var u = /* @__PURE__ */ o(l()), d = {
	from: {},
	to: {},
	duration: 1e3,
	delay: 0,
	easing: { outQuart: [
		.165,
		.84,
		.44,
		1
	] }.outQuart,
	onStart: {
		is: !1,
		method: () => {}
	},
	onUpdate: () => {},
	onComplete: () => {}
}, f = class {
	enable;
	data;
	playing;
	clearNextFrame;
	playNextFrame;
	addDataNextFrame;
	eachResult;
	result;
	timestamp;
	constructor(e) {
		let t = {
			...d,
			...e
		};
		if (this.enable = !0, this.data = [], this.playing = !1, this.clearNextFrame = !1, this.playNextFrame = !1, this.addDataNextFrame = [], this.timestamp = 0, JSON.stringify(t) !== JSON.stringify(d)) {
			let e = {
				method: t.onStart instanceof Function ? t.onStart : t.onStart.method,
				is: !1
			};
			Object.keys(t.to).length > 0 && this.data.push({
				...t,
				onStart: e
			});
		}
		return this.eachResult = this.result = t.from, this;
	}
	add(e) {
		let { from: t, to: n, duration: r, delay: i, easing: a, onUpdate: o, onComplete: s, onStart: c } = {
			...d,
			...e
		}, l = {
			from: t,
			to: n,
			duration: r,
			delay: i,
			easing: a,
			onUpdate: o,
			onComplete: s,
			onStart: c || {
				method: () => {},
				is: !0
			}
		};
		return l.onStart = e.onStart ? {
			method: c instanceof Function ? c : c.method,
			is: !1
		} : {
			method: () => {},
			is: !0
		}, this.clearNextFrame && this.addDataNextFrame.push(l), this.data.push(l), this;
	}
	clearQueue() {
		return this.data.length > 0 && (this.clearNextFrame = !0), this.data = [], this.addDataNextFrame = [], this.result = this.eachResult, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), this;
	}
	play() {
		let { requestAnimationFrame: e } = window, [t] = this.data;
		if (t) {
			if (this.clearNextFrame) {
				this.playNextFrame = !0;
				return;
			}
			if (!this.playing) return this.playing = !0, this.enable = !0, this.timestamp = (/* @__PURE__ */ new Date()).getTime(), e(() => this.render()), this;
		}
	}
	stop() {
		return this.enable = !1, this.playing = !1, this;
	}
	render() {
		let { requestAnimationFrame: e } = window, [t] = this.data;
		if (!t) return;
		let { from: n, to: r, duration: i, delay: a, easing: o, onUpdate: s, onComplete: c, onStart: l } = t, d = n || this.result, f = (/* @__PURE__ */ new Date()).getTime() - this.timestamp - (a || 0), [p, m, h, g] = o, _ = u(p, m, h, g), v = f / i;
		if (f < 0) {
			e(() => this.render());
			return;
		}
		if (Object.keys(l).length !== 0) {
			if (l instanceof Function) l?.();
			else {
				let { method: e, is: t } = l;
				!t && e && (l.is = !0, e?.(d));
			}
		}
		let y = {}, b = [];
		Object.entries(r).forEach((e) => {
			let [t, n] = e, r = Object.entries(d).filter((e) => e[0] === t);
			if (r.length === 0) {
				b.push(t);
				return;
			}
			let i = r.length > 0 ? r[0][1] : null;
			if (i === void 0) return;
			let a = i + (n - i) * _(v);
			y[t] = a;
		}), b.forEach((e) => {
			console.warn(`[Tweener] property "${e}" is undefined.`);
		}), f < i ? (this.eachResult = {
			...this.result,
			...y
		}, s?.(this.eachResult), this.enable ? e(() => this.render()) : (this.result = {
			...this.result,
			...y
		}, this.clearNextFrame && (this.clearNextFrame = !1, this.addDataNextFrame.length > 0 ? (this.data = [...this.addDataNextFrame], this.addDataNextFrame = []) : this.data = []), this.playNextFrame && (this.playNextFrame = !1, this.play()))) : (this.result = this.eachResult = {
			...this.result,
			...r
		}, this.data.shift(), c?.(this.result), this.data.length > 0 ? (this.reset(), this.data[0].from = this.data[0].from || this.result, this.enable && e(() => this.render())) : this.playing = !1);
	}
	reset() {
		this.timestamp = (/* @__PURE__ */ new Date()).getTime();
	}
}, p = (e) => {
	let t = [
		0,
		0,
		0
	];
	e.length === 4 ? t = [
		1,
		2,
		3
	].map((t) => parseInt(e[t] + e[t], 16)) : e.length === 7 && (t = [
		1,
		3,
		5
	].map((t) => parseInt(e.slice(t, t + 2), 16)));
	let [n, r, i] = t.map((e) => e / 255), a = Math.min(n, r, i), o = Math.max(n, r, i), s = o - a, c;
	c = s === 0 ? 0 : o === n ? (r - i) / s % 6 : o === r ? (i - n) / s + 2 : (n - r) / s + 4, c = Math.round(c * 60), c < 0 && (c += 360);
	let l = (o + a) / 2, u = s === 0 ? 0 : s / (1 - Math.abs(2 * l - 1));
	return [
		c,
		+(u * 100).toFixed(1),
		+(l * 100).toFixed(1)
	];
}, m = [
	"backgroundColor",
	"color",
	"borderColor"
], h = [
	"scale",
	"x",
	"y",
	"rotate",
	"rotateY",
	"rotateX",
	"rotateZ",
	"skewX",
	"skewY"
], g = {
	scale: "scale",
	rotate: "rotate",
	x: "translateX",
	y: "translateY",
	skewX: "skewX",
	skewY: "skewY",
	rotateY: "rotateY",
	rotateX: "rotateX",
	rotateZ: "rotateZ"
}, _ = {
	scale: "",
	rotate: "deg",
	x: "px",
	y: "px",
	skewX: "deg",
	skewY: "deg",
	rotateY: "deg",
	rotateX: "deg",
	rotateZ: "deg"
}, v = (e) => {
	let [t, n, r] = p(e);
	return [{
		h: t,
		s: n,
		l: r
	}, "hsl"];
}, y = (e) => {
	let t = String(e), n = parseFloat(t), r = t.split(String(n)).join("");
	return isNaN(n) ? [Number(e), ""] : [n, r];
}, b = (e, t) => m.includes(e) ? v(String(t)) : y(t), x = (e, t) => `${g[e]}(${t}${_[e]})`, S = (e) => {
	let t = {}, n = [];
	return Object.entries(e).forEach(([e, r]) => {
		h.includes(e) ? n.push(x(e, r)) : t[e] = r;
	}), n.length && (t.transform = n.join(" ")), t;
}, C = (e, t) => {
	let n = {}, r = [];
	return Object.entries(e).forEach(([e, i]) => {
		let [a, o] = e.split("@"), s = t[a];
		s === "hsl" ? n[a] = {
			...n[a],
			[o]: i
		} : h.includes(e) ? r.push(x(e, i)) : n[a] = `${i}${s}`;
	}), r.length && (n.transform = r.join(" ")), Object.entries(n).forEach(([e, t]) => {
		if (m.includes(e) && typeof t == "object" && t) {
			let r = t;
			n[e] = `hsl(${r.h}, ${r.s}%, ${r.l}%)`;
		}
	}), n;
}, w = {
	linear: [
		0,
		0,
		1,
		1
	],
	easeIn: [
		.42,
		0,
		1,
		1
	],
	easeOut: [
		0,
		0,
		.58,
		1
	],
	easeInOut: [
		.42,
		0,
		.58,
		1
	],
	inSine: [
		.47,
		0,
		.745,
		.715
	],
	outSine: [
		.39,
		.575,
		.565,
		1
	],
	inOutSine: [
		.445,
		.05,
		.55,
		.95
	],
	inCubic: [
		.55,
		.055,
		.675,
		.19
	],
	outCubic: [
		.215,
		.61,
		.355,
		1
	],
	inOutCubic: [
		.645,
		.045,
		.355,
		1
	],
	InQuint: [
		.755,
		.05,
		.855,
		.06
	],
	OutQuint: [
		.23,
		1,
		.32,
		1
	],
	InOutQuint: [
		.86,
		0,
		.07,
		1
	],
	inCirc: [
		.6,
		.04,
		.98,
		.335
	],
	outCirc: [
		.075,
		.82,
		.165,
		1
	],
	inOutCirc: [
		.785,
		.135,
		.15,
		.86
	],
	inQuad: [
		.55,
		.085,
		.68,
		.53
	],
	outQuad: [
		.25,
		.46,
		.45,
		.94
	],
	inOutQuad: [
		.455,
		.03,
		.515,
		.955
	],
	inQuart: [
		.895,
		.03,
		.685,
		.22
	],
	outQuart: [
		.165,
		.84,
		.44,
		1
	],
	inOutQuart: [
		.77,
		0,
		.175,
		1
	],
	inExpo: [
		.95,
		.05,
		.795,
		.035
	],
	outExpo: [
		.19,
		1,
		.22,
		1
	],
	inOutExpo: [
		1,
		0,
		0,
		1
	],
	inBack: [
		.6,
		-.28,
		.735,
		.045
	],
	outBack: [
		.175,
		.885,
		.32,
		1.275
	],
	inOutBack: [
		.68,
		-.55,
		.265,
		1.55
	]
}, T = {
	duration: 1e3,
	easing: w.outQuart,
	delay: 0,
	onStart: () => {},
	onUpdate: () => {},
	onEnd: () => {}
}, E = (e) => {
	let [t, n] = a(e), r = i({}), o = i({}), s = () => {
		let e = {}, n = {};
		return Object.keys(r.current).length ? (e = r.current, n = o.current) : (Object.entries(t).forEach((t) => {
			let [r, i] = t, a = b(r, i);
			if (a) {
				let [t, i] = a;
				typeof t == "object" ? Object.entries(t).forEach((t) => {
					let [n, i] = t;
					e[`${r}@${n}`] = i;
				}) : e[r] = t, n[r] = i;
			}
		}), o.current = n), {
			from: e,
			unit: n
		};
	}, c = i(null);
	return [
		S(t),
		(e, t) => {
			let i;
			i = typeof t == "number" ? {
				...T,
				duration: t
			} : {
				...T,
				...t
			};
			let { from: a, unit: o } = s(), l = {};
			Object.entries(e).forEach((e) => {
				let [t, n] = e, r = b(t, n);
				if (r) {
					let [e] = r;
					typeof e == "object" ? Object.entries(e).forEach((e) => {
						let [n, r] = e;
						l[`${t}@${n}`] = r;
					}) : l[t] = e;
				}
			}), (c.current ??= new f({ from: a })).stop().clearQueue().add({
				to: l,
				from: a,
				...i,
				onUpdate: (e) => {
					r.current = e, n(C(e, o)), i.onUpdate(e);
				},
				onComplete: (e) => {
					r.current = e, n(C(e, o)), i.onEnd(e);
				}
			}).play();
		},
		() => {
			c.current?.stop();
		}
	];
}, D = ({ children: i, initStyle: a, tweenStyle: o, options: s = { duration: 1e3 } }) => {
	let [c, l, u] = E(a);
	return r(() => (o && l(o, s), () => u()), [o]), e.map(i, (e) => {
		if (typeof e == "string") return n("div", {
			style: c,
			children: e
		});
		let r = e;
		return t(r, {
			...r.props,
			style: {
				...r.props.style,
				...c
			}
		});
	});
};
//#endregion
export { w as Bezier, D as TweenProvider, f as Tweener, E as default, E as useTween };
