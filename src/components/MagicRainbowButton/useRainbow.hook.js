import React from 'react';

import { COLORS } from '@constants';
import { generateId } from '@utils';

const rainbowColors = [
  'hsl(1deg, 96%, 55%)', // red
  'hsl(25deg, 100%, 50%)', // orange
  'hsl(40deg, 100%, 50%)', // yellow
  'hsl(66deg, 100%, 45%)', // lime
  'hsl(130deg, 100%, 40%)', // green
  'hsl(177deg, 100%, 35%)', // aqua
  'hsl(230deg, 100%, 45%)', // blue
  'hsl(240deg, 100%, 45%)', // indigo
  'hsl(260deg, 100%, 55%)', // purple
  'hsl(325deg, 100%, 48%)', // pink
];

const hasBrowserSupport = typeof CSS.registerProperty === 'function';

const useRainbow = ({ timeoutDelay }) => {
  if (!hasBrowserSupport) {
    return;
  }

  const { current: uniqueId } = React.useRef(generateId());

  const getColorPropName = index =>
    `--magic-rainbow-color-${uniqueId}-${index}`;

  const [colors, setColors] = React.useState({
    [getColorPropName(0)]: rainbowColors[0],
    [getColorPropName(1)]: rainbowColors[0],
    [getColorPropName(2)]: rainbowColors[0],
  });

  React.useEffect(() => {
    Object.entries(colors).forEach(([name, color], index) => {
      CSS.registerProperty({
        name: name,
        syntax: '<color>',
        inherits: false,
        initialValue: color,
      });
    });
  }, []);

  React.useEffect(() => {
    let currentCycleIndex = 0;
    let timeoutId;

    const updateColors = () => {
      currentCycleIndex++;

      const c0 = rainbowColors[currentCycleIndex % rainbowColors.length];
      const c1 = rainbowColors[(currentCycleIndex - 1) % rainbowColors.length];
      const c2 = rainbowColors[(currentCycleIndex - 2) % rainbowColors.length];

      setColors({
        [getColorPropName(0)]: c0,
        [getColorPropName(1)]: c1,
        [getColorPropName(2)]: c2,
      });

      timeoutId = window.setTimeout(updateColors, timeoutDelay);
    };

    updateColors();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeoutDelay]);

  return colors;
};

export default useRainbow;
