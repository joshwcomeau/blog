import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

import UnstyledButton from '../UnstyledButton';
import Tooltip from '../Tooltip';

const Asterisk = ({ children }: Props) => {
  return (
    <Wrapper>
      <Tooltip
        content={children}
        placement="bottom"
        animation="scale-subtle"
        theme="material"
        arrow={true}
        duration={200}
        delay={[250, 0]}
        distance={8}
      >
        <TouchArea>
          <AsteriskGlyph>*</AsteriskGlyph>
        </TouchArea>
      </Tooltip>
    </Wrapper>
  );
};

export const Wrapper = styled.span`
  display: inline-block;
  width: 15px;
  height: 1em;
  position: relative;
`;

const AsteriskGlyph = styled.span`
  position: relative;
  font-size: 21px;
  font-weight: 500;
  color: ${COLORS.pink[500]};
`;

const TouchArea = styled(UnstyledButton)`
  position: absolute;
  display: block;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  padding: 10px;
  transform: translateY(5px);
  cursor: pointer;
`;

export default Asterisk;
