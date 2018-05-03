import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';

export const Icon = ({ icon, iconHover, color, colorHover, ...delegated }) => (
  <Wrapper>
    <IconWrapper>
      <IconBase icon={icon} style={{ color }} {...delegated} />
    </IconWrapper>
    {iconHover && (
      <IconHoverWrapper>
        <IconBase
          icon={iconHover}
          style={{ color: colorHover }}
          {...delegated}
        />
      </IconHoverWrapper>
    )}
  </Wrapper>
);

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const IconWrapper = styled.span`
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const IconHoverWrapper = styled.span`
  display: inline-block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 200ms;

  &:hover {
    opacity: 1;
  }
`;

export default Icon;
