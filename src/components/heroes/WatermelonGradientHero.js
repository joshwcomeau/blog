import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';
import Mountains from '../Mountains';

import BaseHero from './BaseHero';

const WatermelonGradientHero = ({
  title,
  publishedOn,
  orientation,
  headerHeight,
}) => (
  <BaseHero
    title={title}
    publishedOn={publishedOn}
    orientation={orientation}
    headerHeight={headerHeight}
    background="linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)"
    titleGradientSteps={['80deg', COLORS.pink[500], COLORS.purple[700]]}
    authorColor={COLORS.pink[500]}
    publishedOnColor={COLORS.purple[500]}
    curveColors={[COLORS.white, COLORS.green[700], COLORS.green[500]]}
    decorations={
      <MountainsWrapper>
        <Mountains />
      </MountainsWrapper>
    }
  />
);

const MountainsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;

  @media ${BREAKPOINTS.sm} {
    display: none;
  }
`;

export default WatermelonGradientHero;
