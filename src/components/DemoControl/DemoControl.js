import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

const DemoControl = ({ label, children, ...delegated }) => (
  <Wrapper {...delegated}>
    <Label>{label}</Label>
    <ChildWrapper>{children}</ChildWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 30%;
  max-width: 125px;
`;

const ChildWrapper = styled.div`
  flex: 1;

  @media ${BREAKPOINTS.mdMin} {
    display: flex;
  }
`;

export default DemoControl;
