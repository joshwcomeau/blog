import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

import Link from './Link';

export default ({ children, ...delegated }) => (
  <Link {...delegated}>
    <Wrapper>{children}</Wrapper>
  </Link>
);

const Wrapper = styled.span`
  color: ${COLORS.blue[500]};
`;
