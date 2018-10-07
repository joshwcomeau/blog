// @flow
import React from 'react';
import styled from 'styled-components';

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
  flex: 1;
  display: flex;
  align-items: center;
  text-align: left;
  outline: none;
`;

const Label = styled.div`
  flex: 1;
`;

export default Choice;
