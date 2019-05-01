import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

const RadioButton = ({ name, id, isSelected, handleSelect, size = 15 }) => (
  <Wrapper>
    <RadioInput
      type="radio"
      name={name}
      id={id}
      checked={isSelected}
      onChange={() => handleSelect(id)}
    />
    <Svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={size / 2}
        ry={size / 2}
        fill="none"
        stroke={COLORS.blue[700]}
        strokeWidth={1}
      />

      <FilledEllipse
        cx={size / 2}
        cy={size / 2}
        rx={size / 2 - 2}
        ry={size / 2 - 2}
        fill={COLORS.blue[700]}
        stroke="none"
        strokeWidth={2}
        style={{
          transform: isSelected ? 'scale(1)' : 'scale(0)',
        }}
      />
    </Svg>
  </Wrapper>
);

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const RadioInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;

const Svg = styled.svg`
  display: block;
  overflow: visible;
  margin-right: 12px;
`;

const FilledEllipse = styled.ellipse`
  transition: transform 300ms;
  transform-origin: center center;
`;

export default RadioButton;
