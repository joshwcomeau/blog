import React from 'react';
import styled from 'styled-components';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { socialTwitterOutline } from 'react-icons-kit/ionicons/socialTwitterOutline';

import Icon from './Icon';

const LargeScreenSidebar = () => (
  <Wrapper>
    <Icon icon={socialTwitterOutline} iconHover={socialTwitter} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default LargeScreenSidebar;
