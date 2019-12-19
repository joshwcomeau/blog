import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

export default styled.div`
  @media ${BREAKPOINTS.md} {
    display: none;
  }
`;
