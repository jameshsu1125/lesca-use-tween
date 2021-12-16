"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitSpliter = exports.UnitConbiner = void 0;

var _color2 = _interopRequireDefault(require("color"));

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

var useColor = ['backgroundColor', 'color', 'borderColor'];

var pureUnit = function pureUnit(e) {
  var t = String(e);
  var isN = t.slice(0, 1) === '-';
  var mt;
  if (isN) mt = t.substring(1);else mt = t;

  var _mt$match = mt.match(/^([0-9]+\.?[0-9]*)(.*)/),
      _mt$match2 = _slicedToArray(_mt$match, 3),
      i = _mt$match2[1],
      u = _mt$match2[2];

  return [Number(i) * (isN ? -1 : 1), u];
};

var hex2hls = function hex2hls(e) {
  var c = (0, _color2["default"])(e);

  var _c$hsl = c.hsl(),
      color = _c$hsl.color,
      model = _c$hsl.model;

  var _color = _slicedToArray(color, 3),
      h = _color[0],
      s = _color[1],
      l = _color[2];

  return [{
    h: h,
    s: s,
    l: l
  }, model];
};

var UnitSpliter = function UnitSpliter(styleName, value) {
  var isColor = useColor.filter(function (e) {
    return e === styleName;
  }).length !== 0;
  if (isColor) return hex2hls(value);
  return pureUnit(value);
};

exports.UnitSpliter = UnitSpliter;

var UnitConbiner = function UnitConbiner(e, u) {
  var result = {};
  Object.entries(e).forEach(function (t) {
    var _t = _slicedToArray(t, 2),
        key = _t[0],
        value = _t[1];

    var _key$split = key.split('@'),
        _key$split2 = _slicedToArray(_key$split, 2),
        classname = _key$split2[0],
        c = _key$split2[1];

    var unit = u[classname];

    if (unit === 'hsl') {
      result[classname] = _objectSpread(_objectSpread({}, result[classname]), {}, _defineProperty({}, c, value));
    } else result[classname] = "".concat(value).concat(unit);
  });
  Object.entries(result).forEach(function (e) {
    var _e2 = _slicedToArray(e, 2),
        key = _e2[0],
        value = _e2[1];

    var isHSL = useColor.filter(function (e) {
      return e === key;
    });

    if (isHSL.length !== 0) {
      var h = value.h,
          s = value.s,
          l = value.l;
      result[key] = "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
    }
  });
  return result;
};

exports.UnitConbiner = UnitConbiner;