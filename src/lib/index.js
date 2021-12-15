import Tweener, { Bezier } from 'lesca-object-tweener';
import { useState, useRef } from 'react';
import { UnitSpliter, UnitConbiner } from './constants';

const defaultSetting = {
	easing: Bezier.easeOutQuart,
	delay: 0,
	onStart: () => {},
	onUpdate: () => {},
	onComplete: () => {},
};

const useTween = (initialState) => {
	const [state, setstate] = useState(initialState);
	const tweenerRef = useRef(new Tweener());

	return [
		state,
		(duration, style, setting) => {
			const opt = { ...defaultSetting, ...setting };
			const unit = {};
			const tweener = tweenerRef.current;

			const from = {};
			Object.entries(state).forEach((e) => {
				const [classname, value] = e;
				const result = UnitSpliter(classname, value);
				if (result) {
					const [pureValue, pureUnit] = result;
					if (pureUnit === 'hsl') {
						Object.entries(pureValue).forEach((e) => {
							const [key, v] = e;
							from[`${classname}@${key}`] = v;
						});
					} else from[classname] = pureValue;
					unit[classname] = pureUnit;
				}
			});

			const to = {};
			Object.entries(style).forEach((e) => {
				const [classname, value] = e;
				const result = UnitSpliter(classname, value);
				if (result) {
					const [pureValue, pureUnit] = result;
					if (pureUnit === 'hsl') {
						Object.entries(pureValue).forEach((e) => {
							const [key, v] = e;
							to[`${classname}@${key}`] = v;
						});
					} else to[classname] = pureValue;
				}
			});

			tweener
				.stop()
				.clearQueue()
				.add({
					to,
					from,
					duration,
					...opt,
					onUpdate: (e) => {
						setstate(UnitConbiner(e, unit));
						opt.onUpdate(e);
					},
					onComplete: (e) => {
						setstate(UnitConbiner(e, unit));
						opt.onComplete(e);
					},
				})
				.play();
		},
	];
};

export { useTween, Bezier };
export default useTween;
