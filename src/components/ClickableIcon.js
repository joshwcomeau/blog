import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';

export const ClickableIcon = ({
  href,
  onClick,
  icon,
  iconHover,
  color,
  colorHover,
  padding = 10,
  ...delegated
}) => {
  const Element = href ? ExternalLink : Button;

  return (
    <Element href={href} onClick={onClick} padding={padding}>
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
    </Element>
  );
};

const ExternalLink = styled.a`
  display: inline-block;
  position: relative;
`;

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
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

  ${ExternalLink}:hover & {
    opacity: 1;
  }

  ${Button}:hover & {
    opacity: 1;
  }
`;

export default ClickableIcon;
