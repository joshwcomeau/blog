// TODO: Ahhh this abstraction sucks. Find a better one.
import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';

import Link from './Link';

export const ClickableIcon = ({
  href,
  target,
  external,
  icon,
  iconHover,
  color,
  colorHover,
  ...delegated
}) => {
  return (
    <LinkWrapper external={external} href={href} target={target}>
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
    </LinkWrapper>
  );
};

const LinkWrapper = styled(Link)`
  position: relative;
  display: block;
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
`;

export default ClickableIcon;
