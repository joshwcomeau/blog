import React from 'react';
import styled from 'styled-components';

const DemoControl = ({ label, children }) => (
  <Wrapper>
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
`;

const ChildWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export default DemoControl;
