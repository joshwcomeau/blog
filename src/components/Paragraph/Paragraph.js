import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

export default styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media ${BREAKPOINTS.sm} {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;
