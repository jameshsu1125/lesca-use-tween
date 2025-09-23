import ReactDOM from 'react-dom/client';
import useTween, { Bezier, TweenProvider } from '.';

const App = () => {
  const [style, setStyle] = useTween({ opacity: 1, backgroundColor: '#ff6600', x: 0, y: 0 });
  return (
    <div className='flex w-full justify-center'>
      <div className='w-full max-w-4xl p-20'>
        <div className='h-96 w-full bg-gray-200'>
          <div className='h-20 w-20 bg-red-500' style={style} />
        </div>
        <button
          onClick={() => {
            setStyle(
              {
                opacity: Math.random(),
                backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
              },
              { duration: 1000 },
            );
          }}
          className='btn btn-primary'
        >
          play
        </button>
        {[...new Array(10).keys()].map((index) => (
          <TweenProvider
            key={index}
            initStyle={{ x: 0, y: 0 }}
            tweenStyle={{ x: Math.random() * 100, y: Math.random() * 100 }}
            options={{ duration: 2000, easing: Bezier.InOutQuint, delay: 500 }}
          >
            <div className='h-10 w-10 rounded-full bg-blue-500'></div>
          </TweenProvider>
        ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
