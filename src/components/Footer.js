import React from 'react';
import styled from 'styled-components';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { socialTwitterOutline } from 'react-icons-kit/ionicons/socialTwitterOutline';
import { socialGithub } from 'react-icons-kit/ionicons/socialGithub';
import { socialGithubOutline } from 'react-icons-kit/ionicons/socialGithubOutline';
import { iosEmail } from 'react-icons-kit/ionicons/iosEmail';
import { iosEmailOutline } from 'react-icons-kit/ionicons/iosEmailOutline';
import { COLORS } from '../constants';

import ClickableIcon from './ClickableIcon';

const WIDTH = 32;

const Footer = () => (
  <Wrapper>
    <Copyright>
      All that stuff up there was written by me, <Name>Josh Comeau</Name>. All
      rights reserved.
    </Copyright>
    <Icons>
      <ClickableIcon
        external
        size={WIDTH}
        href="https://www.twitter.com/joshwcomeau"
        icon={socialTwitter}
        iconHover={socialTwitter}
        color={COLORS.gray[400]}
        colorHover={COLORS.gray[800]}
      />
      <ClickableIcon
        external
        size={WIDTH}
        href="https://www.github.com/joshwcomeau"
        icon={socialGithub}
        iconHover={socialGithub}
        color={COLORS.gray[400]}
        colorHover={COLORS.gray[800]}
      />
      <ClickableIcon
        external
        size={WIDTH}
        href="mailto:joshwcomeau@gmail.com"
        icon={iosEmail}
        iconHover={iosEmail}
        color={COLORS.gray[400]}
        colorHover={COLORS.gray[800]}
      />
    </Icons>
  </Wrapper>
);

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  background: ${COLORS.gray[100]};
  color: ${COLORS.gray[900]};
`;

const Name = styled.span`
  font-weight: 600;
  color: ${COLORS.pink[500]};
`;

const Copyright = styled.div`
  font-size: 16px;
  text-align: center;
`;

const Icons = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  width: ${WIDTH * 3 + 50}px;
  margin: auto;
  margin-top: 20px;
`;

export default Footer;
