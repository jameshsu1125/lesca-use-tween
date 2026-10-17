import { CSSProperties } from 'react';
import { HSL, TweenValues } from './type';
export declare const unitSplitter: (styleName: string, value: string | number) => [HSL, string] | [number, string];
export declare const InitTransformCombiner: (style: object) => CSSProperties;
export declare const UnitCombiner: (e: TweenValues, u: Record<string, string>) => CSSProperties;
