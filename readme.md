[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
npm install lesca-use-tween --save
```

# Usage

```javascript
import useTween from '../lib/index';

const component = () => {
	const [style, tweenStyle] = useTween({ width: '0px', height: '0px' });

	useEffect(() => {
		tween(1000, { width: '100px', height: '200px' }, { delay: 2000 });
	}, []);

	return <div style={style} />;
};
```

# Methods

| method   |    options    |    description    | default |
| :------- | :-----------: | :---------------: | ------: |
| useTween | style Objects | React style props |         |

# Properties

| Properties                       |  type   |       description        | default |
| :------------------------------- | :-----: | :----------------------: | ------: |
| .tween(duration, style, setting) |         |                          |         |
| (duration)                       | number  |      tween duration      |    1000 |
| (style)                          | object  |    React style props     |         |
| (setting)                        | Objects | {delay, onStart, easing} |         |
