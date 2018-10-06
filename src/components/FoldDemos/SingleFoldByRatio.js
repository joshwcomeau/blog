import React from 'react';
import styled from 'styled-components';

import autumnSrc from 'assets/images/sandis-helvigs-autumn.jpg';

const SingleFoldByRatio = ({ percentage }) => (
  <Wrapper
    style={{
      transform: `translateY(${percentage / 4}%)`,
    }}
  >
    <TopHalf>
      <HideOverflow>
        <Image src={autumnSrc} />
      </HideOverflow>
    </TopHalf>
    <BottomHalf
      style={{
        transform: `
          rotateX(${convertPercentageToRotation(percentage)}deg)
        `,
      }}
    >
      <HideOverflow>
        <Image src={autumnSrc} />
        <Backside />
      </HideOverflow>
    </BottomHalf>

    <FlickerFixer style={{ opacity: percentage > 50 ? 0 : 1 }} />
  </Wrapper>
);

const convertPercentageToRotation = percentage => 180 * percentage / 100;

const Wrapper = styled.div`
  display: inline-block;
  perspective: 1000px;
`;

const HideOverflow = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Half = styled.div`
  position: relative;
  z-index: 2;
  width: 333px;
  height: 250px;
`;

const TopHalf = styled(Half)``;

const BottomHalf = styled(Half)`
  transform-origin: top center;
  transform-style: preserve-3d;

  & img {
    transform: translateY(-250px);
  }
`;

const Image = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Backside = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  transform: rotateX(180deg);
  backface-visibility: hidden;
`;

const FlickerFixer = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(50% - 1px);
  left: 0;
  width: 100%;
  height: 2px;
  background-image: url(${autumnSrc});
  background-position: 0% 50%;
  background-size: cover;
`;

export default SingleFoldByRatio;
