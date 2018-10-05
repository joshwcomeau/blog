// TODO: Ahhh this abstraction sucks. Find a better one.
import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';

import Link from '../Link';
import InvisibleButton from '../InvisibleButton';

export const ClickableIcon = ({
  href,
  icon,
  iconHover,
  color,
  colorHover,
  size,
  ...delegated
}) => {
  const Wrapper = href ? LinkWrapper : ButtonWrapper;

  return (
    <Wrapper href={href} {...delegated}>
      <IconWrapper>
        <IconBase icon={icon} style={{ color }} size={size} />
      </IconWrapper>

      {iconHover && (
        <IconHoverWrapper>
          <IconBase
            icon={iconHover}
            style={{ color: colorHover }}
            size={size}
          />
        </IconHoverWrapper>
      )}
    </Wrapper>
  );
};

const ButtonWrapper = styled(InvisibleButton)`
  position: relative;
  display: inline-block;
`;

const LinkWrapper = styled(Link)`
  position: relative;
  display: inline-block;
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

  ${LinkWrapper}:hover & {
    opacity: 1;
  }

  ${ButtonWrapper}:hover & {
    opacity: 1;
  }
`;

export default ClickableIcon;
