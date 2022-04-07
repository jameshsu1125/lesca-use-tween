import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '2. add hook',
    code: `import useTween from 'lesca-use-tween';

const component = () => {
  const [style, setStyle, destory] = useTween({ opacity:0 });

  useEffect(() => {
    setStyle({ opacity: 1 });

    return () => {
      destory();
    };
  }, []);

  return(
      <div style={style} />
  )
}


    `,
    type: 'js',
  },
];

const Usage = () => (
  <div className='Usage'>
    <h2>Usage</h2>
    {codes.map((e) => (
      <div key={e.title}>
        <h3>{e.title}</h3>
        <Code code={e.code} theme={e.type} />
      </div>
    ))}
  </div>
);
export default Usage;
