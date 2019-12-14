import styled from 'styled-components';

import { COLORS } from '@constants';

export default styled.span`
  display: inline-block;
  font-family: 'Fira Mono', monospace;
  font-size: 0.8em;
  letter-spacing: -0.5px;
  padding: 2px 6px;
  background: ${COLORS.gray[200]};
`;
