import { useRef } from 'react';
import { render } from 'react-dom';
import useTween from '../lib/index';

import './styles.css';

function Demo() {
	const targetRef = useRef();
	const [target, setTarget] = useTween();

	return (
		<>
			<div ref={targetRef} className='target' />
		</>
	);
}

render(<Demo />, document.getElementById('app'));
