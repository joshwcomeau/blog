import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

export default styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  font-style: italic;
  text-align: center;

  @media ${BREAKPOINTS.sm} {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;
