import { CSSProperties } from 'react';
import { hexToHSL } from './hex2hsl';
import { HSL, TweenValues } from './type';

const useColor = ['backgroundColor', 'color', 'borderColor'];
const useTransform = [
  'scale',
  'x',
  'y',
  'rotate',
  'rotateY',
  'rotateX',
  'rotateZ',
  'skewX',
  'skewY',
];
const functionName: Record<string, string> = {
  scale: 'scale',
  rotate: 'rotate',
  x: 'translateX',
  y: 'translateY',
  skewX: 'skewX',
  skewY: 'skewY',
  rotateY: 'rotateY',
  rotateX: 'rotateX',
  rotateZ: 'rotateZ',
};
const unitName: Record<string, string> = {
  scale: '',
  rotate: 'deg',
  x: 'px',
  y: 'px',
  skewX: 'deg',
  skewY: 'deg',
  rotateY: 'deg',
  rotateX: 'deg',
  rotateZ: 'deg',
};

const hex2hls = (e: string): [HSL, string] => {
  const [h, s, l] = hexToHSL(e);
  return [{ h, s, l }, 'hsl'];
};

const pureUnit = (e: string | number): [number, string] => {
  const t = String(e);

  const num = parseFloat(t);
  const unit = t.split(String(num)).join('');

  if (!isNaN(num)) {
    return [num, unit];
  }
  return [Number(e), ''];
};

export const unitSplitter = (styleName: string, value: string | number) => {
  const isColor = useColor.includes(styleName);
  if (isColor) return hex2hls(String(value));
  return pureUnit(value);
};

const transformFunction = (key: string, value: string | number) =>
  `${functionName[key]}(${value}${unitName[key]})`;

export const InitTransformCombiner = (style: object) => {
  const result: Record<string, unknown> = {};
  const transform: string[] = [];

  Object.entries(style).forEach(([key, value]) => {
    if (useTransform.includes(key)) transform.push(transformFunction(key, value));
    else result[key] = value;
  });

  if (transform.length) result.transform = transform.join(' ');
  return result as CSSProperties;
};

export const UnitCombiner = (e: TweenValues, u: Record<string, string>) => {
  const result: Record<string, unknown> = {};
  const transform: string[] = [];

  Object.entries(e).forEach(([key, value]) => {
    const [classname, c] = key.split('@');
    const unit = u[classname];
    if (unit === 'hsl') {
      result[classname] = { ...(result[classname] as Partial<HSL>), [c]: value };
    } else if (useTransform.includes(key)) {
      transform.push(transformFunction(key, value));
    } else result[classname] = `${value}${unit}`;
  });

  if (transform.length) result.transform = transform.join(' ');

  Object.entries(result).forEach(([key, value]) => {
    if (useColor.includes(key) && typeof value === 'object' && value) {
      const hsl = value as HSL;
      result[key] = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
  });

  return result as CSSProperties;
};
