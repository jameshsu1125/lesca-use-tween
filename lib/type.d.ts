import { CSSProperties, ReactElement } from 'react';
export type TweenValues = Record<string, number>;
export type Callback = (values: TweenValues) => void;
export type Setting = {
    duration: number;
    easing: number[];
    delay: number;
    onStart: Callback;
    onUpdate: Callback;
    onEnd: Callback;
};
export interface Colors {
    color: number[];
    model: string;
}
export type HSL = {
    h: number;
    s: number;
    l: number;
};
export interface CSS extends Omit<CSSProperties, 'rotate'> {
    x?: string | number;
    y?: string | number;
    scale?: string | number;
    scaleX?: string | number;
    scaleY?: string | number;
    rotate?: string | number;
    rotateY?: string | number;
    rotateX?: string | number;
    rotateZ?: string | number;
    skewX?: string | number;
    skewY?: string | number;
}
export interface ProviderProps {
    children: ReactElement;
    initStyle: CSS;
    tweenStyle?: CSS | false;
    options?: Partial<Setting>;
}
export type Options = Partial<Setting> | number;
export type Tween = [CSSProperties, (style: CSS, options?: Options) => void, () => void];
