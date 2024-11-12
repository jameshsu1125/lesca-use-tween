import Tweener from 'lesca-object-tweener';
import {
  CSSProperties,
  Children,
  cloneElement,
  createElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InitTransformCombiner, UnitCombiner, unitSplitter } from './mise';
import { CSS, Options, ProviderProps, Setting, Tween } from './type';

const Bezier = {
  // basic
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],

  // Sine
  inSine: [0.47, 0, 0.745, 0.715],
  outSine: [0.39, 0.575, 0.565, 1],
  inOutSine: [0.445, 0.05, 0.55, 0.95],

  // Cubic
  inCubic: [0.55, 0.055, 0.675, 0.19],
  outCubic: [0.215, 0.61, 0.355, 1],
  inOutCubic: [0.645, 0.045, 0.355, 1],

  // Quint
  InQuint: [0.755, 0.05, 0.855, 0.06],
  OutQuint: [0.23, 1, 0.32, 1],
  InOutQuint: [0.86, 0, 0.07, 1],

  // Circ
  inCirc: [0.6, 0.04, 0.98, 0.335],
  outCirc: [0.075, 0.82, 0.165, 1],
  inOutCirc: [0.785, 0.135, 0.15, 0.86],

  // Quad
  inQuad: [0.55, 0.085, 0.68, 0.53],
  outQuad: [0.25, 0.46, 0.45, 0.94],
  inOutQuad: [0.455, 0.03, 0.515, 0.955],

  // Quart
  inQuart: [0.895, 0.03, 0.685, 0.22],
  outQuart: [0.165, 0.84, 0.44, 1],
  inOutQuart: [0.77, 0, 0.175, 1],

  // Expo
  inExpo: [0.95, 0.05, 0.795, 0.035],
  outExpo: [0.19, 1, 0.22, 1],
  inOutExpo: [1, 0, 0, 1],

  // Back
  inBack: [0.6, -0.28, 0.735, 0.045],
  outBack: [0.175, 0.885, 0.32, 1.275],
  inOutBack: [0.68, -0.55, 0.265, 1.55],
};

const defaultSetting: Setting = {
  duration: 1000,
  easing: Bezier.outQuart,
  delay: 0,
  onStart: () => {},
  onUpdate: () => {},
  onEnd: () => {},
};

const useTween = (initialState: CSS): Tween => {
  const [state, setState] = useState<CSSProperties>(initialState as CSSProperties);
  const fromRef = useRef({});
  const unitRef = useRef({});

  const tranFrom = () => {
    let from: any = {};
    let unit: any = {};

    if (!Object.keys(fromRef.current).length) {
      Object.entries(state).forEach((e) => {
        const [className, value] = e;
        const result = unitSplitter(className, value);
        if (result) {
          const [pureValue, pureUnit] = result;
          if (pureUnit === 'hsl') {
            Object.entries(pureValue).forEach((e) => {
              const [key, v] = e;
              from[`${className}@${key}`] = v;
            });
          } else {
            from[className] = pureValue;
          }
          unit[className] = pureUnit;
        }
      });
      unitRef.current = unit;
    } else {
      from = fromRef.current;
      unit = unitRef.current;
    }
    return { from, unit };
  };

  const tweenerRef = useRef(new Tweener({ from: tranFrom().from }));

  return [
    InitTransformCombiner(state),
    (style: CSSProperties, options: Options) => {
      let opt: Setting;
      if (typeof options === 'number') {
        opt = { ...defaultSetting, duration: options };
      } else {
        opt = { ...defaultSetting, ...options };
      }

      const { from, unit } = tranFrom();
      const to: any = {};
      Object.entries(style).forEach((e) => {
        const [className, value] = e;

        const result = unitSplitter(className, value);
        if (result) {
          const [pureValue, pureUnit] = result;
          if (pureUnit === 'hsl') {
            Object.entries(pureValue).forEach((e) => {
              const [key, v] = e;
              to[`${className}@${key}`] = v;
            });
          } else to[className] = pureValue;
        }
      });

      const tweener = tweenerRef.current;
      tweener
        .stop()
        .clearQueue()
        .add({
          to,
          from,
          ...opt,
          onUpdate: (e: any) => {
            fromRef.current = e;
            setState(UnitCombiner(e, unit));
            opt.onUpdate(e);
          },
          onComplete: (e: any) => {
            fromRef.current = e;
            setState(UnitCombiner(e, unit));
            opt.onEnd(e);
          },
        })
        .play();
    },
    () => {
      tweenerRef.current?.stop();
    },
  ];
};

const TweenProvider = ({
  children,
  initStyle,
  tweenStyle,
  options = { duration: 1000 },
}: ProviderProps) => {
  const [style, setStyle, destroy] = useTween(initStyle);

  useEffect(() => {
    if (tweenStyle) setStyle(tweenStyle, options);
    return () => destroy();
  }, [tweenStyle]);

  return Children.map(children, (child) => {
    if (typeof child === 'string') return createElement('div', { style, children: child });
    return cloneElement(child, { ...child.props, style: { ...child.props.style, ...style } });
  });
};

export { Bezier, TweenProvider, useTween, Tweener };
export default useTween;
