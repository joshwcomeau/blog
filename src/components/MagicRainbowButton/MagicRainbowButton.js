import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';
import { sample } from '@utils';

import useRainbow from './useRainbow.hook';

const MagicRainbowButton = ({ children, ...delegated }) => {
  const timeoutDelay = 2000;
  const transitionDelay = timeoutDelay * 1.25;

  const colors = useRainbow({ timeoutDelay });

  const colorKeys = Object.keys(colors);

  return (
    <ButtonElem
      {...delegated}
      style={{
        ...colors,
        transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[0]}),
            var(${colorKeys[1]}),
            var(${colorKeys[2]})
          )
        `,
      }}
    >
      {children}
    </ButtonElem>
  );
};

const ButtonElem = styled.button`
  position: relative;
  border: none;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
`;

export default MagicRainbowButton;
