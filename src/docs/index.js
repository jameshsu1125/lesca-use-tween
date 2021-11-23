import { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import useTween from '../lib/index';

import './styles.css';

const Demo = () => {
	const targetRef = useRef();
	const [target, setTarget] = useTween({ time: 2000, ref: targetRef, width: 100 });

	useEffect(() => {
		setTarget({
			width: 1000,
			time: 10000,
		});
	}, []);

	return (
		<>
			<div ref={targetRef} className='target' />
		</>
	);
};

render(<Demo />, document.getElementById('app'));
