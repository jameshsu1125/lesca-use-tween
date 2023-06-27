[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/Typescript-4277c0?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

A style tweener for react hook.

#### [Live Demo](https://jameshsu1125.github.io/lesca-use-tween/)

#### [codesandbox](https://codesandbox.io/s/lesca-use-tween-demo-q5t7ns?file=/src/App.js)

# Installation

```sh
npm install lesca-use-tween --save
```

## Usage

#### use hook

```jsx
import useTween from 'lesca-use-tween';

const Component = () => {
  const [style, setStyle, destroy] = useTween({ opacity: 0 });

  useEffect(() => {
    setStyle({ opacity: 1 }); // tween opacity 0 => 1
    return () => destroy();
  }, []);

  return <div style={style} />;
};
```

#### use provider

prevent render on each frame. we can use provider component.

```jsx
import { TweenProvider } from 'lesca-use-tween';

const Component = () => {
  // ! will not keep render each frame in this component.
  return (
    <TweenProvider
      initStyle={{ opacity: 0 }}
      tweenStyle={{ opacity: 1 }}
      tweenOptions={{ duration: 1000 }}
    >
      <div>component</div>
    </TweenProvider>
  );
};
```

## Development

### Methods

| method                           |  options  |     description     |                     return |
| :------------------------------- | :-------: | :-----------------: | -------------------------: |
| useTween(**initStyle**:_object_) | initStyle | React css-inline-js | [style, setStyle, destroy] |

##### React css-inline-js

color, backgroundColor, borderColor... About color properties use **hex(#FF6600)** only.
Transform need to split to {**scale**, **rotate**, **x**, **y** };

```javascript
const style = { transform: 'scale(2) rotate(90deg) translateX(10px) translateY(20px)' } => { scale:2, rotate:90, x:10, y:20 }
```

#### Hook State Method

| method                                                           |       options       |   description    |
| :--------------------------------------------------------------- | :-----------------: | :--------------: |
| setStyle( **style**:_object_, **[setting](#setting)**:_object_ ) | [options](#options) | same as useState |

#### Options

| Options |   type   |     description     |
| :------ | :------: | :-----------------: |
| style   | _object_ | React css-inline-js |
| setting | _object_ | [Setting](#setting) |

#### Setting

| setting  |    type    |       description       |         default |
| :------- | :--------: | :---------------------: | --------------: |
| easing   |  _array_   |      css [Bezier]       | Bezier.OutQuart |
| duration |  _number_  |     tween duration      |            1000 |
| delay    |  _number_  |     delay duration      |               0 |
| onStart  | _function_ |  call when tween start  |                 |
| onUpdate | _function_ |   call for each frame   |                 |
| onEnd    | _function_ | call for tween finished |                 |

### Features

- maintain if necessary

[bezier]: https://www.cssportal.com/css-cubic-bezier-generator/
