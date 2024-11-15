import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';

import useTween, { TweenProvider } from '../../lib';

const Demo = () => {
  const [style, setStyle] = useTween({
    scale: 1,
    rotate: 0,
    backgroundColor: '#006600',
    x: '0px',
    y: '0px',
    opacity: 1,
    rotateY: 0,
    rotateY: 0,
    rotateZ: 0,
  });

  const [tweenStyle, setTweenStyle] = useState();

  return (
    <div className='Demo'>
      <h2>Demo</h2>
      <div className='container'>
        <div className='ball' style={style} />
      </div>
      <pre>
        <code>{JSON.stringify(style)}</code>
      </pre>
      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            const scale = Math.random();
            setStyle({ scale });
          }}
        >
          scale
        </Button>
        <Button
          onClick={() => {
            const rotate = Math.random() * 360;
            setStyle({ rotate });
          }}
        >
          rotate
        </Button>
        <Button
          onClick={() => {
            const x = Math.random() * 200;
            const y = Math.random() * 200;
            setStyle({ x, y });
          }}
        >
          x y
        </Button>
        <Button
          onClick={() => {
            const backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            setStyle({ backgroundColor });
          }}
        >
          backgroundColor
        </Button>
        <Button
          onClick={() => {
            const opacity = Math.random();
            setStyle({ opacity });
          }}
        >
          opacity
        </Button>
        <Button
          onClick={() => {
            const rotateY = Math.random() * 360;
            setStyle({ rotateY });
          }}
        >
          rotateY
        </Button>
      </ButtonGroup>

      <TweenProvider initStyle={{ x: 10, opacity: 0.5 }} tweenStyle={tweenStyle}>
        <div>ccccc</div>
        <div>ccccc</div>
      </TweenProvider>

      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            const x = Math.random() * 100;
            const opacity = Math.random();
            setTweenStyle({ opacity, x });
          }}
        >
          new tween
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default Demo;
