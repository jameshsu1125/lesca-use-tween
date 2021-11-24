"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitUnit = function splitUnit(e) {
  return e.match(/^([0-9]+\.?[0-9]*)(.*)/);
};

var withUnit = function withUnit(e, unit) {
  var s = {};
  Object.entries(e).forEach(function (t) {
    var _t = _slicedToArray(t, 2),
        key = _t[0],
        value = _t[1];

    s[key] = "".concat(value).concat(unit[key]);
  });
  return s;
};

var defaultSetting = {
  easing: _lescaObjectTweener.Bezier.easeOutQuart,
  delay: 0,
  onStart: function onStart() {}
};

var useTween = function useTween(initialState) {
  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setstate = _useState2[1];

  return [state, function (duration, style, setting) {
    var opt = _objectSpread(_objectSpread({}, defaultSetting), setting);

    var from = {};
    var unit = {};
    Object.entries(state).forEach(function (e) {
      var _e2 = _slicedToArray(e, 2),
          classname = _e2[0],
          value = _e2[1];

      var _splitUnit = splitUnit(value),
          _splitUnit2 = _slicedToArray(_splitUnit, 3),
          i = _splitUnit2[1],
          u = _splitUnit2[2];

      from[classname] = Number(i);
      unit[classname] = u;
    });
    var to = {};
    Object.entries(style).forEach(function (e) {
      var _e3 = _slicedToArray(e, 2),
          classname = _e3[0],
          value = _e3[1];

      var _splitUnit3 = splitUnit(value),
          _splitUnit4 = _slicedToArray(_splitUnit3, 2),
          i = _splitUnit4[1];

      to[classname] = Number(i);
    });
    new _lescaObjectTweener["default"](_objectSpread(_objectSpread({
      to: to,
      from: from,
      duration: duration
    }, opt), {}, {
      onUpdate: function onUpdate(e) {
        return setstate(withUnit(e, unit));
      },
      onComplete: function onComplete(e) {
        return setstate(withUnit(e, unit));
      }
    }));
  }];
};

exports.useTween = useTween;
var _default = useTween;
exports["default"] = _default;