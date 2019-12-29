import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';
import DesktopOnly from '@components/DesktopOnly';
import MobileOnly from '@components/MobileOnly';

import gradientIdeaHorizontalSrc from '@assets/images/rainbow-button/gradient-idea-horizontal.svg';
import gradientIdeaVerticalSrc from '@assets/images/rainbow-button/gradient-idea-vertical.svg';

const GradientIdeaImage = () => {
  return (
    <Wrapper>
      <DesktopOnly>
        <img
          src={gradientIdeaHorizontalSrc}
          style={{ display: 'block', width: '100%' }}
        />
      </DesktopOnly>
      <MobileOnly>
        <img src={gradientIdeaVerticalSrc} style={{ maxHeight: '75vh' }} />
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
