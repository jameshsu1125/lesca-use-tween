"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Bezier", {
  enumerable: true,
  get: function get() {
    return _lescaObjectTweener.Bezier;
  }
});
exports.useTween = exports["default"] = void 0;

var _lescaObjectTweener = _interopRequireWildcard(require("lesca-object-tweener"));

var _react = require("react");

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultSetting = {
  easing: _lescaObjectTweener.Bezier.easeOutQuart,
  delay: 0,
  onStart: function onStart() {},
  onUpdate: function onUpdate() {},
  onComplete: function onComplete() {}
};
var tweener = new _lescaObjectTweener["default"]();

var useTween = function useTween(initialState) {
  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setstate = _useState2[1];

  return [state, function (duration, style, setting) {
    var opt = _objectSpread(_objectSpread({}, defaultSetting), setting);

    var unit = {};
    var from = {};
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
      from: from,
      duration: duration
    }, opt), {}, {
      onUpdate: function onUpdate(e) {
        setstate((0, _constants.UnitConbiner)(e, unit));
        opt.onUpdate();
      },
      onComplete: function onComplete(e) {
        setstate((0, _constants.UnitConbiner)(e, unit));
        opt.onComplete();
      }
    })).play();
  }];
};

exports.useTween = useTween;
var _default = useTween;
exports["default"] = _default;