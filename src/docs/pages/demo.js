import { Button, ButtonGroup } from '@mui/material';

import useTween from '../../lib';

const Demo = () => {
  const [style, setStyle] = useTween({
    scale: 1,
    backgroundColor: '#006600',
    x: '0px',
    y: '0px',
    opacity: 1,
  });

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
      </ButtonGroup>
    </div>
  );
};
export default Demo;
