import styled from 'styled-components';

import { COLORS } from '@constants';

export default styled.em`
  font-family: 'Sriracha';
  font-size: 0.9em;
  color: ${props => props.color || COLORS.purple[700]};
  font-style: normal;

  .tippy-popper & {
    color: ${COLORS.white} !important;
  }
`;
