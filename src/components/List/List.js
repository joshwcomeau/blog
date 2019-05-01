import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

// TODO: Find a way to share this with `Paragraph`.
export default styled.ul`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media ${BREAKPOINTS.sm} {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;
