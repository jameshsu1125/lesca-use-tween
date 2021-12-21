import { useEffect } from 'react';
import { render } from 'react-dom';
import { useTween, Bezier } from '../lib/index';

import './styles.css';

const Demo = () => {
	const [style, setStyle] = useTween({
		width: '100px',
		backgroundColor: '#ff6600',
		zIndex: 1,
		scale: 0,
		x: 0,
		rotate: 0,
		y: 0,
	});

	useEffect(() => {
		// console.log(style);
	}, [style]);

	useEffect(() => {
		setStyle(
			{
				backgroundColor: '#ff0000',
				zIndex: 100,
				width: '200px',
				scale: 1,
				x: 500,
				rotate: 180,
				y: 200,
			},
			{
				delay: 2000,
				duration: 800,
				easing: Bezier.easeOutBack,
				onStart: () => {
					console.log('onStart');
				},
				onUpdate: (e) => {
					// console.log('onUpdate');
				},
				onComplete: () => {
					// console.log('onComplete');
				},
			},
		);

		setTimeout(() => {
			setStyle(
				{
					backgroundColor: '#ff0000',
					scale: 0.5,
					width: '300px',
					x: -100,
					rotate: 90,
					y: -100,
				},
				{
					delay: 0,
					duration: 2000,
					easing: Bezier.easeOutBack,
					onStart: () => {
						console.log('onStart');
					},
					onUpdate: (e) => {
						// console.log('onUpdate');
					},
					onComplete: () => {
						// console.log('onComplete');
					},
				},
			);
		}, 2500);
	}, []);

	return (
		<div className='container'>
			<div style={style} className='target' />
		</div>
	);
};

render(<Demo />, document.getElementById('app'));
