import { CSSProperties, ReactElement } from 'react';

export type Setting = {
  duration: number;
  easing: number[];
  delay: number;
  onStart: Function;
  onUpdate: Function;
  onComplete: Function;
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
  x: string;
  y: string;
  scale: string;
}

export interface ProviderProps {
  children: ReactElement;
  defaultStyle: CSS;
  tweenStyle?: CSS;
  options?: Setting;
}
