import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';

export const ClickableIcon = ({
  href,
  icon,
  iconHover,
  color,
  colorHover,
  padding = 10,
  ...delegated
}) =>
  console.log(color, colorHover) || (
    <ExternalLink href={href} padding={padding}>
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
    </ExternalLink>
  );

const ExternalLink = styled.a`
  display: inline-block;
  position: relative;

  &:hover {
    & > span:nth-child(2) {
      opacity: 1;
    }
  }
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
`;

export default ClickableIcon;
