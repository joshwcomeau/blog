import React from 'react';

import FullWidth from '../components/FullWidth';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import styled from 'styled-components';

export default ({ title, publishedOn, children }) => (
  <FullWidth>
    <div>
      <MaxWidthWrapper>
        <h1>{title}</h1>
        <h3>By Josh Comeau, on {publishedOn}.</h3>

        {children}
      </MaxWidthWrapper>
    </div>
  </FullWidth>
);

const Wrapper = styled.div`
  background: red;
`;
