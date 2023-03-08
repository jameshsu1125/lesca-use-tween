var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lesca-object-tweener", "react", "./mise"], function (require, exports, lesca_object_tweener_1, react_1, mise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TweenProvider = exports.Bezier = exports.useTween = void 0;
    lesca_object_tweener_1 = __importDefault(lesca_object_tweener_1);
    var Bezier = {
        // basic
        linear: [0, 0, 1, 1],
        easeIn: [0.42, 0, 1, 1],
        easeOut: [0, 0, 0.58, 1],
        easeInOut: [0.42, 0, 0.58, 1],
        // Sine
        easeInSine: [0.47, 0, 0.745, 0.715],
        easeOutSine: [0.39, 0.575, 0.565, 1],
        easeInOutSine: [0.445, 0.05, 0.55, 0.95],
        // Cubic
        easeInCubic: [0.55, 0.055, 0.675, 0.19],
        easeOutCubic: [0.215, 0.61, 0.355, 1],
        easeInOutCubic: [0.645, 0.045, 0.355, 1],
        // Quint
        easeInQuint: [0.755, 0.05, 0.855, 0.06],
        easeOutQuint: [0.23, 1, 0.32, 1],
        easeInOutQuint: [0.86, 0, 0.07, 1],
        // Circ
        easeInCirc: [0.6, 0.04, 0.98, 0.335],
        easeOutCirc: [0.075, 0.82, 0.165, 1],
        easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
        // Quad
        easeInQuad: [0.55, 0.085, 0.68, 0.53],
        easeOutQuad: [0.25, 0.46, 0.45, 0.94],
        easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
        // Quart
        easeInQuart: [0.895, 0.03, 0.685, 0.22],
        easeOutQuart: [0.165, 0.84, 0.44, 1],
        easeInOutQuart: [0.77, 0, 0.175, 1],
        // Expo
        easeInExpo: [0.95, 0.05, 0.795, 0.035],
        easeOutExpo: [0.19, 1, 0.22, 1],
        easeInOutExpo: [1, 0, 0, 1],
        // Back
        easeInBack: [0.6, -0.28, 0.735, 0.045],
        easeOutBack: [0.175, 0.885, 0.32, 1.275],
        easeInOutBack: [0.68, -0.55, 0.265, 1.55],
    };
    exports.Bezier = Bezier;
    var defaultSetting = {
        duration: 1000,
        easing: Bezier.easeOutQuart,
        delay: 0,
        onStart: function () { },
        onUpdate: function () { },
        onComplete: function () { },
    };
    var useTween = function (initialState) {
        var _a = (0, react_1.useState)(initialState), state = _a[0], setState = _a[1];
        var fromRef = (0, react_1.useRef)({});
        var unitRef = (0, react_1.useRef)({});
        var tranFrom = function () {
            var from = {};
            var unit = {};
            if (!Object.keys(fromRef.current).length) {
                Object.entries(state).forEach(function (e) {
                    var classname = e[0], value = e[1];
                    var result = (0, mise_1.unitSplitter)(classname, value);
                    if (result) {
                        var pureValue = result[0], pureUnit = result[1];
                        if (pureUnit === 'hsl') {
                            Object.entries(pureValue).forEach(function (e) {
                                var key = e[0], v = e[1];
                                from["".concat(classname, "@").concat(key)] = v;
                            });
                        }
                        else {
                            from[classname] = pureValue;
                        }
                        unit[classname] = pureUnit;
                    }
                });
                unitRef.current = unit;
            }
            else {
                from = fromRef.current;
                unit = unitRef.current;
            }
            return { from: from, unit: unit };
        };
        var tweenerRef = (0, react_1.useRef)(new lesca_object_tweener_1.default({ from: tranFrom().from }));
        return [
            (0, mise_1.InitTransformCombiner)(state),
            function (style, setting) {
                var opt;
                if (typeof setting === 'number') {
                    opt = __assign(__assign({}, defaultSetting), { duration: setting });
                }
                else {
                    opt = __assign(__assign({}, defaultSetting), setting);
                }
                var _a = tranFrom(), from = _a.from, unit = _a.unit;
                var to = {};
                Object.entries(style).forEach(function (e) {
                    var classname = e[0], value = e[1];
                    var result = (0, mise_1.unitSplitter)(classname, value);
                    if (result) {
                        var pureValue = result[0], pureUnit = result[1];
                        if (pureUnit === 'hsl') {
                            Object.entries(pureValue).forEach(function (e) {
                                var key = e[0], v = e[1];
                                to["".concat(classname, "@").concat(key)] = v;
                            });
                        }
                        else
                            to[classname] = pureValue;
                    }
                });
                var tweener = tweenerRef.current;
                tweener
                    .stop()
                    .clearQueue()
                    .add(__assign(__assign({ to: to, from: from }, opt), { onUpdate: function (e) {
                        fromRef.current = e;
                        setState((0, mise_1.UnitCombiner)(e, unit));
                        opt.onUpdate(e);
                    }, onComplete: function (e) {
                        fromRef.current = e;
                        setState((0, mise_1.UnitCombiner)(e, unit));
                        opt.onComplete(e);
                    } }))
                    .play();
            },
            function () {
                var _a;
                (_a = tweenerRef.current) === null || _a === void 0 ? void 0 : _a.stop();
            },
        ];
    };
    exports.useTween = useTween;
    var TweenProvider = function (_a) {
        var children = _a.children, defaultStyle = _a.defaultStyle, tweenStyle = _a.tweenStyle, options = _a.options;
        var _b = useTween(defaultStyle), style = _b[0], setStyle = _b[1], destroy = _b[2];
        (0, react_1.useEffect)(function () {
            if (tweenStyle)
                setStyle(tweenStyle, options);
            return function () { return destroy(); };
        }, [tweenStyle]);
        return react_1.Children.map(children, function (child) { return (0, react_1.cloneElement)(child, __assign(__assign({}, child.props), { style: style })); });
    };
    exports.TweenProvider = TweenProvider;
    TweenProvider.defaultProps = {
        defaultStyle: { opacity: 0 },
        tweenStyle: { opacity: 1 },
        options: { duration: 1000 },
    };
    exports.default = useTween;
});
