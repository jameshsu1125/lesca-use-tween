[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

It replace jquery animate. The transition suport easing.

#### [Live Demo](https://jameshsu1125.github.io/lesca-use-tween/)

# Installation

```sh
npm install lesca-use-tween --save
```

## Usage

As a Node module:

```JSX
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

    return () => destory();
  }, []);

  return <div style={style} />;
};
```

## Development

### Methods

| method                              |   options    |     description     |                     return |
| :---------------------------------- | :----------: | :-----------------: | -------------------------: |
| useTween(**initialStyle**:_object_) | initialStyle | React css-inline-js | [style, setStyle, destory] |

##### React css-inline-js

color, backgroundColor, borderColor... About color properties use **hex(#FF6600)** only.
Transform need to split to {**scale**, **rotate**, **x**, **y** };

```javascript
const style = { transform: 'scale(2) rotate(90deg) translateX(10px) translateY(20px)' }; => { scale:2, rotate:90, x:10, y:20 }
```

#### Hook State Medthod

| method                                                           |       options       |   description    |
| :--------------------------------------------------------------- | :-----------------: | :--------------: |
| setStyle( **style**:_object_, **[setting](#setting)**:_object_ ) | [options](#options) | same as useState |

#### Options

| Options |   type   |     description     |
| :------ | :------: | :-----------------: |
| style   | _object_ | React css-inline-js |
| setting | _object_ | [Setting](#setting) |

#### Setting

| setting    |    type    |                             description                             |             default |
| :--------- | :--------: | :-----------------------------------------------------------------: | ------------------: |
| easing     |  _array_   | css [Bezier](https://www.cssportal.com/css-cubic-bezier-generator/) | Bezier.easeOutQuart |
| duration   |  _number_  |                           tween duration                            |                1000 |
| delay      |  _number_  |                           delay duration                            |                   0 |
| onStart    | _function_ |                        call when tween start                        |                     |
| onUpdate   | _function_ |                         call for each frame                         |                     |
| onComplete | _function_ |                       call for tween finished                       |                     |

### Features

- TypeScript
- maintain if necessary
