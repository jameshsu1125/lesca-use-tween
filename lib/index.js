"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenProvider = exports.Bezier = void 0;
Object.defineProperty(exports, "Tweener", {
  enumerable: true,
  get: function get() {
    return _lescaObjectTweener["default"];
  }
});
exports.useTween = exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _lescaObjectTweener = _interopRequireDefault(require("lesca-object-tweener"));
var _react = require("react");
var _mise = require("./mise");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Bezier = exports.Bezier = {
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
};
var defaultSetting = {
  duration: 1000,
  easing: Bezier.outQuart,
  delay: 0,
  onStart: function onStart() {},
  onUpdate: function onUpdate() {},
  onEnd: function onEnd() {}
};
var useTween = exports.useTween = function useTween(initialState) {
  var _useState = (0, _react.useState)(initialState),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var fromRef = (0, _react.useRef)({});
  var unitRef = (0, _react.useRef)({});
  var tranFrom = function tranFrom() {
    var from = {};
    var unit = {};
    if (!Object.keys(fromRef.current).length) {
      Object.entries(state).forEach(function (e) {
        var _e = (0, _slicedToArray2["default"])(e, 2),
          className = _e[0],
          value = _e[1];
        var result = (0, _mise.unitSplitter)(className, value);
        if (result) {
          var _result = (0, _slicedToArray2["default"])(result, 2),
            pureValue = _result[0],
            pureUnit = _result[1];
          if (pureUnit === 'hsl') {
            Object.entries(pureValue).forEach(function (e) {
              var _e2 = (0, _slicedToArray2["default"])(e, 2),
                key = _e2[0],
                v = _e2[1];
              from["".concat(className, "@").concat(key)] = v;
            });
          } else {
            from[className] = pureValue;
          }
          unit[className] = pureUnit;
        }
      });
      unitRef.current = unit;
    } else {
      from = fromRef.current;
      unit = unitRef.current;
    }
    return {
      from: from,
      unit: unit
    };
  };
  var tweenerRef = (0, _react.useRef)(new _lescaObjectTweener["default"]({
    from: tranFrom().from
  }));
  return [(0, _mise.InitTransformCombiner)(state), function (style, options) {
    var opt;
    if (typeof options === 'number') {
      opt = _objectSpread(_objectSpread({}, defaultSetting), {}, {
        duration: options
      });
    } else {
      opt = _objectSpread(_objectSpread({}, defaultSetting), options);
    }
    var _tranFrom = tranFrom(),
      from = _tranFrom.from,
      unit = _tranFrom.unit;
    var to = {};
    Object.entries(style).forEach(function (e) {
      var _e3 = (0, _slicedToArray2["default"])(e, 2),
        className = _e3[0],
        value = _e3[1];
      var result = (0, _mise.unitSplitter)(className, value);
      if (result) {
        var _result2 = (0, _slicedToArray2["default"])(result, 2),
          pureValue = _result2[0],
          pureUnit = _result2[1];
        if (pureUnit === 'hsl') {
          Object.entries(pureValue).forEach(function (e) {
            var _e4 = (0, _slicedToArray2["default"])(e, 2),
              key = _e4[0],
              v = _e4[1];
            to["".concat(className, "@").concat(key)] = v;
          });
        } else to[className] = pureValue;
      }
    });
    var tweener = tweenerRef.current;
    tweener.stop().clearQueue().add(_objectSpread(_objectSpread({
      to: to,
      from: from
    }, opt), {}, {
      onUpdate: function onUpdate(e) {
        fromRef.current = e;
        setState((0, _mise.UnitCombiner)(e, unit));
        opt.onUpdate(e);
      },
      onComplete: function onComplete(e) {
        fromRef.current = e;
        setState((0, _mise.UnitCombiner)(e, unit));
        opt.onEnd(e);
      }
    })).play();
  }, function () {
    var _tweenerRef$current;
    (_tweenerRef$current = tweenerRef.current) === null || _tweenerRef$current === void 0 || _tweenerRef$current.stop();
  }];
};
var TweenProvider = exports.TweenProvider = function TweenProvider(_ref) {
  var children = _ref.children,
    initStyle = _ref.initStyle,
    tweenStyle = _ref.tweenStyle,
    options = _ref.options;
  var _useTween = useTween(initStyle),
    _useTween2 = (0, _slicedToArray2["default"])(_useTween, 3),
    style = _useTween2[0],
    setStyle = _useTween2[1],
    destroy = _useTween2[2];
  (0, _react.useEffect)(function () {
    if (tweenStyle) setStyle(tweenStyle, options);
    return function () {
      return destroy();
    };
  }, [tweenStyle]);
  return _react.Children.map(children, function (child) {
    return /*#__PURE__*/(0, _react.cloneElement)(child, _objectSpread(_objectSpread({}, child.props), {}, {
      style: _objectSpread(_objectSpread({}, child.props.style), style)
    }));
  });
};
TweenProvider.defaultProps = {
  options: {
    duration: 1000
  },
  preload: false
};
var _default = exports["default"] = useTween;