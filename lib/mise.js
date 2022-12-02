"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitSpliter = exports.UnitCombiner = exports.InitTransformCombiner = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _color2 = _interopRequireDefault(require("color"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var useColor = ['backgroundColor', 'color', 'borderColor'];
var useTransform = ['scale', 'x', 'y', 'rotate'];
var funtionName = {
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
  var c = (0, _color2["default"])(e);
  var colorParam = c.hsl();
  var color = colorParam.color,
    model = colorParam.model;
  var _color = (0, _slicedToArray2["default"])(color, 3),
    h = _color[0],
    s = _color[1],
    l = _color[2];
  return [{
    h: h,
    s: s,
    l: l
  }, model];
};
var pureUnit = function pureUnit(e) {
  var t = String(e);
  var num = window.parseFloat(t);
  var unit = t.split(String(num)).join('');
  if (!isNaN(num)) {
    return [num, unit];
  }
  return [Number(e), ''];
};
var UnitSpliter = function UnitSpliter(styleName, value) {
  var isColor = useColor.filter(function (e) {
    return e === styleName;
  }).length !== 0;
  if (isColor) return hex2hls(value);
  return pureUnit(value);
};
exports.UnitSpliter = UnitSpliter;
var InitTransformCombiner = function InitTransformCombiner(style) {
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
      var matchKey = Object.entries(funtionName).filter(function (e) {
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
exports.InitTransformCombiner = InitTransformCombiner;
var UnitCombiner = function UnitCombiner(e, u) {
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
      var matchKey = Object.entries(funtionName).filter(function (e) {
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
exports.UnitCombiner = UnitCombiner;