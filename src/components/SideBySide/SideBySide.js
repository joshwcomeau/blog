// HACK: This component is really really bad, plz ignore

import React from 'react';
import styled from 'styled-components';
import Spacer from '../Spacer';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;

  /* HACK: These numbers aren't universal! */
  @media (min-width: 1130px) {
    width: 100vw;
    margin-left: calc((100vw - 786px) / -2);
    justify-content: center;
  }

  @media (max-width: 1129px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SideBySide = ({ spacerSize = 10, children }) => {
  // HACK: Throwing this together REALLY quickly. Definitely better ways
  // to do this!
  // TODO: Validate that `srcs` is an array with 2 strings
  return (
    <Wrapper>
      {React.Children.toArray(children).map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {i !== children.length - 1 && <Spacer size={spacerSize} />}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default SideBySide;
