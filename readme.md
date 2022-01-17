[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
npm install lesca-use-tween --save
```

# Usage

```javascript
import { useTween, Bezier } from 'lesca-use-tween';

const Component = () => {
	const [style, setStyle, destory] = useTween({
		width: '0px',
		height: '0px',
		backgroundColor: '#ff6600',
	});

	useEffect(() => {
		setStyle(
			{ width: '100px', height: '200px', backgroundColor: '#ff0000' },
			{
				delay: 2000, // default 0
				duration: 1000, // default 1000
				easing: Bezier.easeOut, // default easeOutQuart
				onStart: () => {},
				onUpdate: () => {},
				onComeplete: () => {},
			},
		);
		() => {
			destory();
		};
	}, []);

	return <div style={style} />;
};
```

# Methods

| method                 |   options    |     description     | default |
| :--------------------- | :----------: | :-----------------: | ------: |
| useTween(initialStyle) | initialState | React css-inline-js |         |

##### React css-inline-js

color, backgroundColor, borderColor... About color properties use **hex(#FF6600)** only.
Transform need to split to { scale, rotate, x, y };

```javascript
const style = { transform: 'scale(2) rotate(90deg) translateX(10px) translateY(20px)' }; => { scale:2, rotate:90, x:10, y:20 }
```

# Hook State Medthod

| method                                                 |       options       |   description    | default |
| :----------------------------------------------------- | :-----------------: | :--------------: | ------: |
| **#setStyle( [style](#Options), [setting](#Options))** | [options](#Options) | same as useState |         |

# Options

| Options  |   type   |     description     | default |
| :------- | :------: | :-----------------: | ------: |
| style    |  object  | React css-inline-js |         |
| setting  | objects  | [Setting](#setting) |         |
| dispatch | function |     stop update     |         |

# Setting

| setting    |   type   |                             description                             |             default |
| :--------- | :------: | :-----------------------------------------------------------------: | ------------------: |
| easing     |  array   | css [Bezier](https://www.cssportal.com/css-cubic-bezier-generator/) | Bezier.easeOutQuart |
| duration   |  number  |                           tween duration                            |                1000 |
| delay      |  number  |                           delay duration                            |                   0 |
| onStart    | function |                        call when tween start                        |                     |
| onUpdate   | function |                         call for each frame                         |                     |
| onComplete | function |                       call for tween finished                       |                     |
