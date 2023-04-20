/// <reference types="react" />
import { CSS, ProviderProps } from './type';
declare const Bezier: {
    linear: number[];
    easeIn: number[];
    easeOut: number[];
    easeInOut: number[];
    easeInSine: number[];
    easeOutSine: number[];
    easeInOutSine: number[];
    easeInCubic: number[];
    easeOutCubic: number[];
    easeInOutCubic: number[];
    easeInQuint: number[];
    easeOutQuint: number[];
    easeInOutQuint: number[];
    easeInCirc: number[];
    easeOutCirc: number[];
    easeInOutCirc: number[];
    easeInQuad: number[];
    easeOutQuad: number[];
    easeInOutQuad: number[];
    easeInQuart: number[];
    easeOutQuart: number[];
    easeInOutQuart: number[];
    easeInExpo: number[];
    easeOutExpo: number[];
    easeInOutExpo: number[];
    easeInBack: number[];
    easeOutBack: number[];
    easeInOutBack: number[];
};
declare const useTween: (initialState: CSS) => any[];
declare const TweenProvider: {
    ({ children, defaultStyle, tweenStyle, options }: ProviderProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
    defaultProps: {
        options: {
            duration: number;
        };
        preload: boolean;
    };
};
export { useTween, Bezier, TweenProvider };
export default useTween;
