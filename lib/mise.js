"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unitSplitter = exports.UnitCombiner = exports.InitTransformCombiner = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _hex2hsl = require("./hex2hsl");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var useColor = ['backgroundColor', 'color', 'borderColor'];
var useTransform = ['scale', 'x', 'y', 'rotate'];
var functionName = {
  scale: 'scale',
  rotate: 'rotate',
  x: 'translateX',
  y: 'translateY'
};
var unitName = {
  scale: '',
  rotate: 'deg',
  x: 'px',
  y: 'px'
};
var hex2hls = function hex2hls(e) {
  var color = (0, _hex2hsl.hexToHSL)(e);
  var _color = (0, _slicedToArray2["default"])(color, 3),
    h = _color[0],
    s = _color[1],
    l = _color[2];
  return [{
    h: h,
    s: s,
    l: l
  }, 'hsl'];
};
var pureUnit = function pureUnit(e) {
  var t = String(e);
  var num = parseFloat(t);
  var unit = t.split(String(num)).join('');
  if (!isNaN(num)) {
    return [num, unit];
  }
  return [Number(e), ''];
};
var unitSplitter = exports.unitSplitter = function unitSplitter(styleName, value) {
  var isColor = useColor.filter(function (e) {
    return e === styleName;
  }).length !== 0;
  if (isColor) return hex2hls(value);
  return pureUnit(value);
};
var InitTransformCombiner = exports.InitTransformCombiner = function InitTransformCombiner(style) {
  var result = {};
  Object.entries(style).forEach(function (t) {
    var _t = (0, _slicedToArray2["default"])(t, 2),
      key = _t[0],
      value = _t[1];
    var isTransform = useTransform.filter(function (e) {
      return e === key;
    });
    if (isTransform.length > 0) {
      var _isTransform = (0, _slicedToArray2["default"])(isTransform, 1),
        _key = _isTransform[0];
      var matchKey = Object.entries(functionName).filter(function (e) {
        return e[0] === _key;
      });
      var f = matchKey[0][1];
      var matchUnit = Object.entries(unitName).filter(function (e) {
        return e[0] === _key;
      });
      var u = matchUnit[0][1];
      if (result.transform) {
        result.transform += " ".concat(f, "(").concat(value).concat(u, ")");
      } else result.transform = "".concat(f, "(").concat(value).concat(u, ")");
    } else result[key] = value;
  });
  return result;
};
var UnitCombiner = exports.UnitCombiner = function UnitCombiner(e, u) {
  var result = {};
  Object.entries(e).forEach(function (t) {
    var _t2 = (0, _slicedToArray2["default"])(t, 2),
      key = _t2[0],
      value = _t2[1];
    var _key$split = key.split('@'),
      _key$split2 = (0, _slicedToArray2["default"])(_key$split, 2),
      classname = _key$split2[0],
      c = _key$split2[1];
    var unit = u[classname];
    var isTransform = useTransform.filter(function (e) {
      return e === key;
    });
    if (unit === 'hsl') {
      result[classname] = _objectSpread(_objectSpread({}, result[classname]), {}, (0, _defineProperty2["default"])({}, c, value));
    } else if (isTransform.length > 0) {
      var _isTransform2 = (0, _slicedToArray2["default"])(isTransform, 1),
        _key2 = _isTransform2[0];
      var matchKey = Object.entries(functionName).filter(function (e) {
        return e[0] === _key2;
      });
      var f = matchKey[0][1];
      var matchUnit = Object.entries(unitName).filter(function (e) {
        return e[0] === _key2;
      });
      var _u = matchUnit[0][1];
      if (result.transform) {
        result.transform += " ".concat(f, "(").concat(value).concat(_u, ")");
      } else result.transform = "".concat(f, "(").concat(value).concat(_u, ")");
    } else result[classname] = "".concat(value).concat(unit);
  });
  Object.entries(result).forEach(function (e) {
    var _e = (0, _slicedToArray2["default"])(e, 2),
      key = _e[0],
      value = _e[1];
    var isHSL = useColor.filter(function (e) {
      return e === key;
    });
    if (isHSL.length !== 0) {
      var hsl = value;
      if (value instanceof Object) result[key] = "hsl(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%)");
    }
  });
  return result;
};