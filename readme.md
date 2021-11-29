[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
npm install lesca-use-tween --save
```

# Usage

```javascript
import { useTween, Bezier } from 'lesca-use-tween';

const Component = () => {
	const [style, setStyle] = useTween({ width: '0px', height: '0px', backgroundColor: '#ff6600' });

	useEffect(() => {
		setStyle(
			1000,
			{ width: '100px', height: '200px', backgroundColor: '#ff0000' },
			{
				easing: Bezier.easeOut,
				delay: 2000,
				onStart: () => {},
				onUpdate: () => {},
				onComeplete: () => {},
			},
		);
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

# Hook State Medthod

| method                                                                      |       options       |   description    | default |
| :-------------------------------------------------------------------------- | :-----------------: | :--------------: | ------: |
| **#setStyle([duration](#Options), [style](#Options), [setting](#Options))** | [options](#Options) | same as useState |         |

# Options

| Options  |  type   |     description     | default |
| :------- | :-----: | :-----------------: | ------: |
| duration | number  |   tween duration    |    1000 |
| style    | object  | React css-inline-js |         |
| setting  | objects | [Setting](#setting) |         |

# Setting

| setting    |   type   |                             description                             |             default |
| :--------- | :------: | :-----------------------------------------------------------------: | ------------------: |
| easing     |  array   | css [Bezier](https://www.cssportal.com/css-cubic-bezier-generator/) | Bezier.easeOutQuart |
| delay      |  number  |                           delay duration                            |                   0 |
| onStart    | function |                        call when tween start                        |                     |
| onUpdate   | function |                         call for each frame                         |                     |
| onComplete | function |                       call for tween finished                       |                     |
