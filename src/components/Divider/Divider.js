import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

import SquigglyLine from '../SquigglyLine';

export default ({ width = 100, height = 50, ...delegated }) => (
  <Wrapper width={width} {...delegated}>
    <SquigglyLine
      width={width}
      height={height}
      squiggleWidth={10}
      stroke={COLORS.violet[500]}
      strokeWidth={2}
    />
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 72px auto;
  max-width: ${props => props.width}px;
`;
