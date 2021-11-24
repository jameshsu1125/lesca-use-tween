import Tweener, { Bezier } from 'lesca-object-tweener';
import { useState } from 'react';

const splitUnit = (e) => {
	return e.match(/^([0-9]+\.?[0-9]*)(.*)/);
};

const withUnit = (e, unit) => {
	const s = {};
	Object.entries(e).forEach((t) => {
		const [key, value] = t;
		s[key] = `${value}${unit[key]}`;
	});
	return s;
};

const defaultSetting = {
	easing: Bezier.easeOutQuart,
	delay: 0,
	onStart: () => {},
};

const useTween = (initialState) => {
	const [state, setstate] = useState(initialState);

	return [
		state,
		(duration, style, setting) => {
			const opt = { ...defaultSetting, ...setting };

			const from = {};
			const unit = {};
			Object.entries(state).forEach((e) => {
				const [classname, value] = e;
				const [, i, u] = splitUnit(value);
				from[classname] = Number(i);
				unit[classname] = u;
			});
			const to = {};
			Object.entries(style).forEach((e) => {
				const [classname, value] = e;
				const [, i] = splitUnit(value);
				to[classname] = Number(i);
			});

			new Tweener({
				to,
				from,
				duration,
				...opt,
				onUpdate: (e) => setstate(withUnit(e, unit)),
				onComplete: (e) => setstate(withUnit(e, unit)),
			});
		},
	];
};

export { useTween, Bezier };
export default useTween;
