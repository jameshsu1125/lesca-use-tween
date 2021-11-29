import { useEffect } from 'react';
import { render } from 'react-dom';
import { useTween, Bezier } from '../lib/index';

import './styles.css';

const Demo = () => {
	const [style, setStyle] = useTween({
		width: '0px',
		height: '0px',
		backgroundColor: '#ff6600',
		zIndex: 1,
	});

	useEffect(() => {
		// console.log(style);
	}, [style]);

	useEffect(() => {
		setStyle(
			800,
			{
				width: '100px',
				height: '200px',
				backgroundColor: '#ff0000',
				zIndex: 100,
			},
			{
				delay: 2000,
				easing: Bezier.easeOutBack,
				onStart: () => {
					console.log('onStart');
				},
				onUpdate: () => {
					console.log('onUpdate');
				},
				onComplete: () => {
					console.log('onComplete');
				},
			},
		);
	}, []);

	return (
		<div className='container'>
			<div style={style} className='target' />
		</div>
	);
};

render(<Demo />, document.getElementById('app'));
