import React from 'react';
import styled from 'styled-components';

const FoldableImage = ({ width, height, alt, percentage, src }) => {
  const backgroundImage = `url(${src})`;

  return (
    <Wrapper
      style={{
        transform: `translateY(${percentage / 4}%)`,
      }}
    >
      <TopHalf width={width} height={height}>
        <img
          src={src}
          alt={alt}
          style={{
            width,
            height,
          }}
        />
      </TopHalf>
      <BottomHalf
        width={width}
        height={height}
        style={{
          backgroundImage,
          backgroundPosition: '0 100%',
          transform: `rotateX(${convertPercentageToRotation(percentage)}deg)`,
        }}
      >
        <Shadow
          style={{
            opacity: percentage * 0.015,
          }}
        />
        <Backside />
      </BottomHalf>

      {/*
        Because the entire card is translating down during the fold, I'm
        seeing a flicker in the crook of the fold. Repeating our trick a third
        time, I can apply the image to a 2px-tall element positioned in the
        crook of the fold.

        If you aren't translating the card during folding, you shouldn't need
        this fix.
      */}
      <FlickerFixer
        height={height}
        style={{
          opacity: percentage > 50 ? 0 : 1,
          backgroundImage,
        }}
      />
    </Wrapper>
  );
};

const convertPercentageToRotation = percentage => percentage * 1.8;

const Wrapper = styled.div`
  display: inline-block;
  perspective: 1250px;
`;

const Half = styled.div`
  position: relative;
  z-index: 2;
  width: ${props => props.width}px;
  height: ${props => props.height / 2}px;
  background-size: cover;
`;

const TopHalf = styled(Half)`
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

const BottomHalf = styled(Half)`
  transform-origin: top center;
  transform-style: preserve-3d;
  border-radius: 0 0 10px 10px;
`;

const Backside = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: rgba(255, 255, 255, 0.9);
  transform: rotateX(180deg) translateZ(2px);
  backface-visibility: hidden;
  border-radius: 10px 10px 0 0;
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
  background-position: 0% 50%;
`;

export default FoldableImage;
