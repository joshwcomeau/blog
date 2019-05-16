/**
 * A sidebar bit of knowledge or information.
 * To be used as additional information, within a blog post
 *
 * NOTE: CURRENTLY UNUSED. See `Sidenote` instead?
 */
import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { iosLightbulb } from 'react-icons-kit/ionicons/iosLightbulb';
import { planet } from 'react-icons-kit/ionicons/planet';

import { COLORS, BREAKPOINTS } from '@constants';

const ICONS_MAP = {
  note: {
    icon: iosLightbulb,
    gradient: `-30deg, ${COLORS.violet[500]}, ${COLORS.purple[500]}`,
  },
  funFact: {
    icon: planet,
    gradient: `30deg, ${COLORS.blue[500]}, ${COLORS.pink[500]}`,
  },
};

const Info = ({ type, children }) => {
  return (
    <Wrapper>
      <Contents type={type}>
        <IconWrapper>
          <IconBase size={32} icon={ICONS_MAP[type].icon} />
        </IconWrapper>
        <span>{children}</span>
      </Contents>

      <Background type={type} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin: 2rem;

  @media ${BREAKPOINTS.sm} {
    margin-left: -16px;
    margin-right: -16px;
  }
`;

const Contents = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  padding: 16px;
  background: ${COLORS.gray[100]};
  /* color: #fff; */
  font-size: 1.25rem;
`;

const Background = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  /* background: linear-gradient(${props => ICONS_MAP[props.type].gradient}); */
`;

const IconWrapper = styled.div`
  padding-right: 16px;
  color: ${COLORS.violet[500]};
`;

export default Info;
