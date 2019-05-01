import styled from 'styled-components';

import { BREAKPOINTS, READING_WIDTH } from '@constants';

const MaxWidthWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${props => props.maxWidth || `${READING_WIDTH}px`};
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${BREAKPOINTS.sm} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default MaxWidthWrapper;
