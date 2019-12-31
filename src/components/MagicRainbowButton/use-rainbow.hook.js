import React from 'react';

import { range, generateId } from '@utils';
import useIncrementingNumber from '@hooks/use-incrementing-number.hook';

const rainbowColors = [
  'hsl(1deg, 96%, 55%)', // red
  'hsl(25deg, 100%, 50%)', // orange
  'hsl(40deg, 100%, 50%)', // yellow
  'hsl(45deg, 100%, 50%)', // yellow
  'hsl(66deg, 100%, 45%)', // lime
  'hsl(130deg, 100%, 40%)', // green
  'hsl(177deg, 100%, 35%)', // aqua
  'hsl(230deg, 100%, 45%)', // blue
  'hsl(240deg, 100%, 45%)', // indigo
  'hsl(260deg, 100%, 55%)', // violet
  'hsl(325deg, 100%, 48%)', // pink
];
const paletteSize = rainbowColors.length;
const WINDOW_SIZE = 3;

// During compile-time build, we have to assume no browser support.
// On mount, we'll check if `CSS.registerProperty` exists
const hasBrowserSupport =
  typeof window !== 'undefined'
    ? typeof window.CSS.registerProperty === 'function'
    : false;

const useRainbow = ({ intervalDelay = 2000 }) => {
  const getColorPropName = index =>
    `--magic-rainbow-color-${uniqueId}-${index}`;

  const prefersReducedMotion =
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!hasBrowserSupport || prefersReducedMotion.matches) {
    return range(0, WINDOW_SIZE).reduce((acc, index) => {
      const name = getColorPropName(index);
      const value = rainbowColors[index % paletteSize];

      return {
        ...acc,
        [name]: value,
      };
    }, {});
  }

  const { current: uniqueId } = React.useRef(generateId());

  // Register all custom properties
  React.useEffect(() => {
    range(0, WINDOW_SIZE).map(index => {
      const name = getColorPropName(index);
      const initialValue = rainbowColors[index];

      CSS.registerProperty({
        name,
        initialValue,
        syntax: '<color>',
        inherits: false,
      });
    });
  }, [WINDOW_SIZE]);

  const intervalCount = useIncrementingNumber(intervalDelay);

  return range(0, WINDOW_SIZE).reduce((acc, index) => {
    const name = getColorPropName(index);
    const value = rainbowColors[(intervalCount + index) % paletteSize];

    return {
      ...acc,
      [name]: value,
    };
  }, {});
};

export default useRainbow;
