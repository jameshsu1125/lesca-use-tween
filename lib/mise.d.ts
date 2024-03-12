import { CSSProperties } from 'react';
export declare const unitSplitter: (styleName: string, value: any) => (string | {
    h: number;
    s: number;
    l: number;
})[] | (string | number)[];
export declare const InitTransformCombiner: (style: object) => CSSProperties;
export declare const UnitCombiner: (e: any, u: any) => any;
