import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { iosLightbulb } from 'react-icons-kit/ionicons/iosLightbulb';
import { planet } from 'react-icons-kit/ionicons/planet';
import { COLORS, BREAKPOINTS } from '../constants';

const ICONS_MAP = {
  note: {
    icon: iosLightbulb,
    gradient: `-20deg, ${COLORS.purple[700]}, ${COLORS.blue[500]}`,
  },
  funFact: {
    icon: planet,
    gradient: `30deg, ${COLORS.blue[500]}, ${COLORS.pink[500]}`,
  },
};

const Info = ({ type, children }) => (
  <Wrapper type={type}>
    <IconWrapper>
      <IconBase size={32} icon={ICONS_MAP[type].icon} />
    </IconWrapper>
    <span>{children}</span>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  background: linear-gradient(${props => ICONS_MAP[props.type].gradient});
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 2rem;

  @media ${BREAKPOINTS.sm} {
    margin-left: -16px;
    margin-right: -16px;
  }
`;

const IconWrapper = styled.div`
  padding-right: 16px;
`;

export default Info;
