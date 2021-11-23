import { useEffect, useState } from 'react';
import { useShallowCompareEffect } from 'react-use';
import './style.less';

const defaultProps = {
	time: 1000,
	onUpdate: () => {},
	onComplete: () => {},
};

const useTween = (props) => {
	const opt = { ...defaultProps, ...props };
	const [state, setState] = useState(opt);

	useShallowCompareEffect(() => {
		console.log(opt);
	}, [state]);

	return [
		opt,
		(p) => {
			const s = { ...opt, ...p };
			setState(() => s);
		},
	];
};

export default useTween;
