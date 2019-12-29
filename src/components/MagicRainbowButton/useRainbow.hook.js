import React from 'react';

import { generateId } from '@utils';
import { useInterval } from '@hooks/use-interval.hook';

const rainbowColors = [
  COLORS.red[500],
  COLORS.orange[500],
  COLORS.yellow[700],
  'hsl(66deg, 100%, 40%)', // lime
  COLORS.green[500],
  'hsl(177deg, 100%, 40%)', // aqua
  COLORS.blue[500],
  COLORS.indigo[500],
  COLORS.purple[500],
  COLORS.pink[500],
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
    [getColorPropName(1)]: rainbowColors[1],
    [getColorPropName(2)]: rainbowColors[2],
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
      const c1 = rainbowColors[(currentCycleIndex + 1) % rainbowColors.length];
      const c2 = rainbowColors[(currentCycleIndex + 2) % rainbowColors.length];

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
