import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '@constants';
import useWindowDimensions from '@hooks/window-dimensions.hook';

import BaseHero from '../BaseHero';
import Mountains from '../Mountains';
import SimpleHero from '../SimpleHero';

const WatermelonGradientHero = ({
  title,
  isPublished,
  publishedOn,
  orientation,
  headerHeight,
}) => {
  const { height: windowHeight } = useWindowDimensions();

  // Two special cases:
  // - In portrait orientation
  // - On a very short device (eg. landscape on a mobile phone)
  //
  // In these cases, we want to opt for a simpler hero, with less possible
  // issues around scrolling and flickering
  const shouldUseSimplerHero =
    orientation === 'portrait' || windowHeight <= 600;

  if (shouldUseSimplerHero) {
    return (
      <SimpleHero
        title={title}
        isPublished={isPublished}
        publishedOn={publishedOn}
      />
    );
  }

  return (
    <BaseHero
      title={title}
      isPublished={isPublished}
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
};

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
