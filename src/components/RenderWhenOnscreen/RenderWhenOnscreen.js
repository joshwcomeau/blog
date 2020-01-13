import React from 'react';

import { throttle } from '../../utils';

const BUFFER = 100;

const useIsOnscreen = elementRef => {
  const [isOnscreen, setIsOnscreen] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = throttle(() => {
      if (!elementRef.current) {
        return;
      }

      const bb = elementRef.current.getBoundingClientRect();

      const isWithinViewport =
        bb.top <= window.innerHeight + BUFFER && bb.bottom > -BUFFER;

      if (isWithinViewport && !isOnscreen) {
        setIsOnscreen(true);
      } else if (!isWithinViewport && isOnscreen) {
        setIsOnscreen(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return isOnscreen;
};

const RenderWhenOnscreen = ({ height, children }) => {
  const ref = React.createRef(null);

  const isOnscreen = useIsOnscreen(ref);

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {isOnscreen && children}
    </div>
  );
};

export default RenderWhenOnscreen;
