import { useEffect } from 'react';
import './style.less';

const useTween = (props) => {
	console.log(props);

	useEffect(() => {
		
	}, [props]);

	return [{},()=>{}]
};

useTween.defaultProps = {
	time: 1000,
	onUpdate:()=>{},
	onComplete: ()=>{}
}

export default useTween;
