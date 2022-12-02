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
define(["require", "exports", "./hex2hsl"], function (require, exports, hex2hsl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnitCombiner = exports.InitTransformCombiner = exports.UnitSpliter = void 0;
    var useColor = ['backgroundColor', 'color', 'borderColor'];
    var useTransform = ['scale', 'x', 'y', 'rotate'];
    var funtionName = { scale: 'scale', rotate: 'rotate', x: 'translateX', y: 'translateY' };
    var unitName = { scale: '', rotate: 'deg', x: 'px', y: 'px' };
    var hex2hls = function (e) {
        var color = (0, hex2hsl_1.hexToHSL)(e);
        var h = color[0], s = color[1], l = color[2];
        return [{ h: h, s: s, l: l }, 'hsl'];
    };
    var pureUnit = function (e) {
        var t = String(e);
        var num = window.parseFloat(t);
        var unit = t.split(String(num)).join('');
        if (!isNaN(num)) {
            return [num, unit];
        }
        return [Number(e), ''];
    };
    var UnitSpliter = function (styleName, value) {
        var isColor = useColor.filter(function (e) { return e === styleName; }).length !== 0;
        if (isColor)
            return hex2hls(value);
        return pureUnit(value);
    };
    exports.UnitSpliter = UnitSpliter;
    var InitTransformCombiner = function (style) {
        var result = {};
        Object.entries(style).forEach(function (t) {
            var key = t[0], value = t[1];
            var isTransform = useTransform.filter(function (e) { return e === key; });
            if (isTransform.length > 0) {
                var key_1 = isTransform[0];
                var matchKey = Object.entries(funtionName).filter(function (e) { return e[0] === key_1; });
                var f = matchKey[0][1];
                var matchUnit = Object.entries(unitName).filter(function (e) { return e[0] === key_1; });
                var u = matchUnit[0][1];
                if (result.transform) {
                    result.transform += " ".concat(f, "(").concat(value).concat(u, ")");
                }
                else
                    result.transform = "".concat(f, "(").concat(value).concat(u, ")");
            }
            else
                result[key] = value;
        });
        return result;
    };
    exports.InitTransformCombiner = InitTransformCombiner;
    var UnitCombiner = function (e, u) {
        var result = {};
        Object.entries(e).forEach(function (t) {
            var _a;
            var key = t[0], value = t[1];
            var _b = key.split('@'), classname = _b[0], c = _b[1];
            var unit = u[classname];
            var isTransform = useTransform.filter(function (e) { return e === key; });
            if (unit === 'hsl') {
                result[classname] = __assign(__assign({}, result[classname]), (_a = {}, _a[c] = value, _a));
            }
            else if (isTransform.length > 0) {
                var key_2 = isTransform[0];
                var matchKey = Object.entries(funtionName).filter(function (e) { return e[0] === key_2; });
                var f = matchKey[0][1];
                var matchUnit = Object.entries(unitName).filter(function (e) { return e[0] === key_2; });
                var u_1 = matchUnit[0][1];
                if (result.transform) {
                    result.transform += " ".concat(f, "(").concat(value).concat(u_1, ")");
                }
                else
                    result.transform = "".concat(f, "(").concat(value).concat(u_1, ")");
            }
            else
                result[classname] = "".concat(value).concat(unit);
        });
        Object.entries(result).forEach(function (e) {
            var key = e[0], value = e[1];
            var isHSL = useColor.filter(function (e) { return e === key; });
            if (isHSL.length !== 0) {
                var hsl = value;
                if (value instanceof Object)
                    result[key] = "hsl(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%)");
            }
        });
        return result;
    };
    exports.UnitCombiner = UnitCombiner;
});
