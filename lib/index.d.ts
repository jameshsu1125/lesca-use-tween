/// <reference types="react" />
import { Setting, CSS, ProviderProps } from './type';
declare const Bezier: {
    linear: number[];
    easeIn: number[];
    easeOut: number[];
    easeInOut: number[];
    inSine: number[];
    outSine: number[];
    inOutSine: number[];
    inCubic: number[];
    outCubic: number[];
    inOutCubic: number[];
    InQuint: number[];
    OutQuint: number[];
    InOutQuint: number[];
    inCirc: number[];
    outCirc: number[];
    inOutCirc: number[];
    inQuad: number[];
    outQuad: number[];
    inOutQuad: number[];
    inQuart: number[];
    outQuart: number[];
    inOutQuart: number[];
    inExpo: number[];
    outExpo: number[];
    inOutExpo: number[];
    inBack: number[];
    outBack: number[];
    inOutBack: number[];
};
type Options = Setting | number;
type Tween = [CSS, (style: CSS, options: Options) => void, () => void];
declare const useTween: (initialState: CSS) => Tween;
declare const TweenProvider: {
    ({ children, initStyle, tweenStyle, options }: ProviderProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
    defaultProps: {
        options: {
            duration: number;
        };
        preload: boolean;
    };
};
export { useTween, Bezier, TweenProvider };
export default useTween;
