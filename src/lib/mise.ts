import { hexToHSL } from './hex2hsl';
import { HSL } from './type';

const useColor = ['backgroundColor', 'color', 'borderColor'];
const useTransform = ['scale', 'x', 'y', 'rotate'];
const functionName = { scale: 'scale', rotate: 'rotate', x: 'translateX', y: 'translateY' };
const unitName = { scale: '', rotate: 'deg', x: 'px', y: 'px' };

const hex2hls = (e: any) => {
  const color = hexToHSL(e);
  const [h, s, l] = color;
  return [{ h, s, l }, 'hsl'];
};

const pureUnit = (e: any) => {
  const t = String(e);

  const num = parseFloat(t);
  const unit = t.split(String(num)).join('');

  if (!isNaN(num)) {
    return [num, unit];
  }
  return [Number(e), ''];
};

export const unitSplitter = (styleName: string, value: any) => {
  const isColor = useColor.filter((e) => e === styleName).length !== 0;
  if (isColor) return hex2hls(value);
  return pureUnit(value);
};

export const InitTransformCombiner = (style: object) => {
  const result: any = {};
  Object.entries(style).forEach((t) => {
    const [key, value] = t;
    const isTransform = useTransform.filter((e) => e === key);

    if (isTransform.length > 0) {
      const [key] = isTransform;
      const matchKey = Object.entries(functionName).filter((e) => e[0] === key);
      const f = matchKey[0][1];
      const matchUnit = Object.entries(unitName).filter((e) => e[0] === key);
      const u = matchUnit[0][1];

      if (result.transform) {
        result.transform += ` ${f}(${value}${u})`;
      } else result.transform = `${f}(${value}${u})`;
    } else result[key] = value;
  });

  return result;
};

export const UnitCombiner = (e: any, u: any) => {
  const result: any = {};
  Object.entries(e).forEach((t) => {
    const [key, value] = t;
    const [classname, c] = key.split('@');
    const unit = u[classname];
    const isTransform = useTransform.filter((e) => e === key);
    if (unit === 'hsl') {
      result[classname] = { ...result[classname], [c]: value };
    } else if (isTransform.length > 0) {
      const [key] = isTransform;
      const matchKey = Object.entries(functionName).filter((e) => e[0] === key);
      const f = matchKey[0][1];
      const matchUnit = Object.entries(unitName).filter((e) => e[0] === key);
      const u = matchUnit[0][1];
      if (result.transform) {
        result.transform += ` ${f}(${value}${u})`;
      } else result.transform = `${f}(${value}${u})`;
    } else result[classname] = `${value}${unit}`;
  });

  Object.entries(result).forEach((e) => {
    const [key, value] = e;
    const isHSL = useColor.filter((e) => e === key);
    if (isHSL.length !== 0) {
      const hsl = value as HSL;
      if (value instanceof Object) result[key] = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
  });

  return result;
};
