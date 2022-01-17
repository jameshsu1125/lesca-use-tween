"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTween = exports["default"] = exports.Bezier = void 0;

var _lescaObjectTweener = _interopRequireDefault(require("lesca-object-tweener"));

var _react = require("react");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};
exports.Bezier = Bezier;
var defaultSetting = {
  duration: 1000,
  easing: Bezier.easeOutQuart,
  delay: 0,
  onStart: function onStart() {},
  onUpdate: function onUpdate() {},
  onComplete: function onComplete() {}
};
var _window = window,
    requestAnimationFrame = _window.requestAnimationFrame;

var useTween = function useTween(initialState) {
  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setstate = _useState2[1];

  var fromRef = (0, _react.useRef)();
  var unitRef = (0, _react.useRef)();

  var tranFrom = function tranFrom() {
    var from = {};
    var unit = {};

    if (!fromRef.current) {
      Object.entries(state).forEach(function (e) {
        var _e2 = _slicedToArray(e, 2),
            classname = _e2[0],
            value = _e2[1];

        var result = (0, _constants.UnitSpliter)(classname, value);

        if (result) {
          var _result = _slicedToArray(result, 2),
              pureValue = _result[0],
              pureUnit = _result[1];

          if (pureUnit === 'hsl') {
            Object.entries(pureValue).forEach(function (e) {
              var _e3 = _slicedToArray(e, 2),
                  key = _e3[0],
                  v = _e3[1];

              from["".concat(classname, "@").concat(key)] = v;
            });
          } else from[classname] = pureValue;

          unit[classname] = pureUnit;
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
  return [(0, _constants.InitTransformCombiner)(state), function (style, setting) {
    var opt = {};

    if (typeof setting === 'number') {
      opt = _objectSpread(_objectSpread({}, defaultSetting), {}, {
        duration: setting
      });
    } else {
      opt = _objectSpread(_objectSpread({}, defaultSetting), setting);
    }

    var tweener = tweenerRef.current;

    var _tranFrom = tranFrom(),
        from = _tranFrom.from,
        unit = _tranFrom.unit;

    var to = {};
    Object.entries(style).forEach(function (e) {
      var _e4 = _slicedToArray(e, 2),
          classname = _e4[0],
          value = _e4[1];

      var result = (0, _constants.UnitSpliter)(classname, value);

      if (result) {
        var _result2 = _slicedToArray(result, 2),
            pureValue = _result2[0],
            pureUnit = _result2[1];

        if (pureUnit === 'hsl') {
          Object.entries(pureValue).forEach(function (e) {
            var _e5 = _slicedToArray(e, 2),
                key = _e5[0],
                v = _e5[1];

            to["".concat(classname, "@").concat(key)] = v;
          });
        } else to[classname] = pureValue;
      }
    });
    tweener.stop().clearQueue().add(_objectSpread(_objectSpread({
      to: to,
      from: from
    }, opt), {}, {
      onUpdate: function onUpdate(e) {
        fromRef.current = e;
        setstate((0, _constants.UnitCombiner)(e, unit));
        opt.onUpdate(e);
      },
      onComplete: function onComplete(e) {
        fromRef.current = e;
        setstate((0, _constants.UnitCombiner)(e, unit));
        opt.onComplete(e);
      }
    })).play();
  }, function () {
    var _tweenerRef$current;

    (_tweenerRef$current = tweenerRef.current) === null || _tweenerRef$current === void 0 ? void 0 : _tweenerRef$current.stop();
  }];
};

exports.useTween = useTween;
var _default = useTween;
exports["default"] = _default;