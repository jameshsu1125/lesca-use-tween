import { useEffect } from 'react';
import { render } from 'react-dom';
import { useTween, Bezier } from '../lib/index';

import './styles.css';

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
		setStyle({ x: 0 });
	});

	useEffect(() => {
		console.log(style);
	}, [style]);

	return (
		<div className='container'>
			<div style={style} className='target' />
		</div>
	);
};

render(<Demo />, document.getElementById('app'));
