// @flow
import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

import RadioButton from '../RadioButton';
import InvisibleButton from '../InvisibleButton';

const Choice = ({ id, parentId, isSelected, handleSelect, children }) => (
  <Wrapper onClick={handleSelect}>
    <RadioButton
      id={id}
      name={parentId}
      isSelected={isSelected}
      handleSelect={handleSelect}
    />
    <Label>{children}</Label>
  </Wrapper>
);

const Wrapper = styled(InvisibleButton)`
  display: flex;
  align-items: center;
  text-align: left;
  outline: none;

  @media ${BREAKPOINTS.mdMin} {
    flex: 1;
  }
`;

const Label = styled.div`
  flex: 1;
`;

export default Choice;
