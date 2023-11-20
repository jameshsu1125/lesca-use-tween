import { CSSProperties, ReactElement } from 'react';
export type Setting = {
    duration: number;
    easing: number[];
    delay: number;
    onStart: Function;
    onUpdate: Function;
    onEnd: Function;
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
export interface CSS extends CSSProperties {
    x?: string | number;
    y?: string | number;
    scale?: string | number;
}
export interface ProviderProps {
    children: ReactElement;
    initStyle: CSS;
    tweenStyle?: CSS;
    options?: Partial<Setting>;
}
export type Options = Partial<Setting> | number;
export type Tween = [CSS, (style: CSS, options?: Options) => void, () => void];
