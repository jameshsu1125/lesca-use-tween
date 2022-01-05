import { useEffect } from 'react';
import { render } from 'react-dom';
import { useTween, Bezier } from '../lib/index';

import './styles.css';

const s = { index: 0 };

const Demo = () => {
	const [style, setStyle] = useTween({
		scale: 1,
		x: 300,
		rotate: 40,
		y: 200,
		width: '100px',
		height: '100px',
	});

	document.addEventListener('mousedown', () => {
		s.index++;
		if (s.index === 1) {
			setStyle({ x: 500 });
		} else if (s.index === 2) {
			setStyle({ scale: 2, x: 0, y: 0 });
		}
	});

	useEffect(() => {
		// console.log(style);
	}, [style]);

	return (
		<div className='container'>
			<div style={style} className='target' />
		</div>
	);
};

render(<Demo />, document.getElementById('app'));
