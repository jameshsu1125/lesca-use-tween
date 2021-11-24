import { useEffect } from 'react';
import { render } from 'react-dom';
import { useTween, Bezier } from '../lib/index';

import './styles.css';

const Demo = () => {
	const [style, tween] = useTween({ width: '0px', height: '0px' });

	useEffect(() => {
		tween(1000, { width: '100px', height: '200px' }, { delay: 2000, easing: Bezier.easeInQuart });
	}, []);

	return (
		<>
			<div style={style} className='target' />
		</>
	);
};

render(<Demo />, document.getElementById('app'));
