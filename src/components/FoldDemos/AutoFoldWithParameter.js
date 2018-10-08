// @flow
import React from 'react';
import styled from 'styled-components';

const SingleFoldByRatio = ({ width, height, percentage, children }) => {
  return (
    <Wrapper
      style={{
        transform: `translateY(${percentage / 4}%)`,
      }}
    >
      <TopHalf width={width} height={height}>
        <HideOverflow side="top">{children}</HideOverflow>
      </TopHalf>
      <BottomHalf
        width={width}
        height={height}
        style={{
          transform: `rotateX(${convertPercentageToRotation(percentage)}deg)`,
        }}
      >
        <HideOverflow side="bottom">
          <Shadow
            style={{
              opacity: Math.min(0.5, percentage * 0.01),
            }}
          />
          <InverseShifter height={height}>{children}</InverseShifter>
          <Backside />
        </HideOverflow>
      </BottomHalf>

      <FlickerFixer
        height={height}
        style={{ opacity: percentage > 50 ? 0 : 1 }}
      >
        {children}
      </FlickerFixer>
    </Wrapper>
  );
};

const convertPercentageToRotation = percentage => 180 * percentage / 100;

const Wrapper = styled.div`
  display: inline-block;
  perspective: 1250px;
`;

const HideOverflow = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: ${props =>
    props.side === 'top' ? '10px 10px 0 0' : '0 0 10px 10px'};
`;

const Half = styled.div`
  position: relative;
  z-index: 2;
  width: ${props => props.width}px;
  height: ${props => props.height / 2}px;
`;

const TopHalf = styled(Half)``;

const BottomHalf = styled(Half)`
  transform-origin: top center;
  transform-style: preserve-3d;
`;

const InverseShifter = styled.div`
  transform: translateY(${props => props.height / 2 * -1}px);
`;

const Image = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Backside = styled.div`
  position: absolute;
  z-index: 2;
  top: -1px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  transform: rotateX(180deg) translateZ(0.01px);
  backface-visibility: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  backface-visibility: hidden;
  border-radius: 0 0 10px 10px;
  transform: translateZ(0.01px);
`;

const FlickerFixer = styled.div`
  position: absolute;
  z-index: 1;
  top: ${props => props.height * 0.5}px;
  left: 0;
  width: 100%;
  height: 2px;
  overflow: hidden;

  & > * {
    position: absolute;
    top: ${props => props.height * -0.5}px;
    left: 0;
    right: 0;
  }
`;

export default SingleFoldByRatio;
