import React from 'react';
import styled from 'styled-components';

import DesktopOnly from '@components/DesktopOnly';
import MobileOnly from '@components/MobileOnly';

import gradientIdeaHorizontalSrc from '@assets/images/rainbow-button/gradient-idea-horizontal.svg';
import gradientIdeaVerticalSrc from '@assets/images/rainbow-button/gradient-idea-vertical.svg';

const GradientIdeaImage = () => {
  return (
    <Wrapper>
      <DesktopOnly>
        <img
          alt="Diagram showing how there are 3 color 'positions', from top-left to bottom-right. On each tick, colors move 1 spot to the right. So the top-left color shifts to the middle, which then shifts to the right."
          src={gradientIdeaHorizontalSrc}
          style={{ display: 'block', width: '100%' }}
        />
      </DesktopOnly>
      <MobileOnly>
        <img
          alt=""
          src={gradientIdeaVerticalSrc}
          style={{ maxHeight: '75vh' }}
        />
      </MobileOnly>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 48px;
`;

export default GradientIdeaImage;
