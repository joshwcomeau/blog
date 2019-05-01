import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

import Link from '../Link';

const GRADIENTS = {
  grayscale: `-30deg, ${COLORS.gray[700]}, ${COLORS.gray[900]}`,
  pink: `
    -30deg,
    ${COLORS.pink[300]},
    ${COLORS.pink[500]},
    ${COLORS.pink[700]}
  `,
  vibrant: `
  -30deg,
    ${COLORS.pink[500]},
    ${COLORS.purple[500]} 80%,
    ${COLORS.blue[500]}`,
};

export default ({ size = '1.5rem', colorway = 'pink' }) => (
  <WrapperLink href="/">
    <Logo size={size} gradient={GRADIENTS[colorway]}>
      Josh Comeau
    </Logo>
  </WrapperLink>
);

const WrapperLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.span`
  font-size: ${props => props.size};
  font-weight: 900;
  letter-spacing: -1px;
  background: -webkit-linear-gradient(${props => props.gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
