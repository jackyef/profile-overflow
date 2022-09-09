import { useNProgress } from '@tanem/react-nprogress';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const RouteLoader = () => {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: state.isRouteChanging,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <div
      key={state.loadingKey}
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className="bg-orange-500 z-50"
        style={{
          height: '4px',
          left: 0,
          marginLeft: `${(-1 + progress) * 100}%`,
          position: 'fixed',
          top: 0,
          transition: `margin-left ${animationDuration}ms linear`,
          width: '100%',
        }}
      >
        <div
          className="shadow-orange-300 shadow-xl"
          style={{
            display: 'block',
            height: '100%',
            opacity: '1',
            position: 'absolute',
            right: '0',
            transform: 'rotate(3deg) translate(0px, -4px)',
            width: '100px',
          }}
        />
      </div>
    </div>
  );
};
