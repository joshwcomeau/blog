import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { sample } from '../../utils';

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

const getColorPropName = index => `--magic-rainbow-color-${index}`;

const useRainbowBackground = colors => {};

const MagicRainbowButton = ({ children, ...delegated }) => {
  const [colors, setColors] = React.useState({
    [getColorPropName(0)]: rainbowColors[0],
    [getColorPropName(1)]: rainbowColors[1],
    [getColorPropName(2)]: rainbowColors[2],
  });

  React.useEffect(() => {
    try {
      Object.entries(colors).forEach(([name, color], index) => {
        CSS.registerProperty({
          name: name,
          syntax: '<color>',
          inherits: false,
          initialValue: color,
        });
      });
    } catch (err) {
      if (
        err.toString().match('The name provided has already been registered.')
      ) {
        console.log('Already registered');
        // This is fine. Just means that there are multiple instances of
        // this component, and we don't need to re-register these properties.
      } else if (err.toString().match('is not a function')) {
        // This is also fine! Means that this browser doesn't support
        // the Houdini part of custom properties.
      } else {
        throw new Error(err);
      }
    }

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

      timeoutId = window.setTimeout(updateColors, 2000);
    };

    updateColors();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ButtonElem {...delegated} style={colors}>
      {children}
    </ButtonElem>
  );
};

const ButtonElem = styled.button`
  position: relative;
  border: none;
  color: white;
  /* prettier-ignore */
  transition:
    ${getColorPropName(0)} 2250ms linear,
    ${getColorPropName(1)} 2250ms linear,
    ${getColorPropName(2)} 2250ms linear;
  background: radial-gradient(
    circle at top left,
    var(${getColorPropName(2)}),
    var(${getColorPropName(1)}),
    var(${getColorPropName(0)})
  );
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    transition:
    ${getColorPropName(0)} 1000ms linear,
    ${getColorPropName(1)} 1000ms linear,
    ${getColorPropName(2)} 1000ms linear;

  }
`;

export default MagicRainbowButton;
