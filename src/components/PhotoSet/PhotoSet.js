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

const Image = styled.img`
  @media (min-width: 800px) {
    height: 350px;
  }
  @media (max-width: 799px) {
    width: calc(100vw - 32px);
    margin: 0 16px;
  }
`;

const PhotoSet = ({ srcs = [], meta = [] }) => {
  // HACK: Throwing this together REALLY quickly. Definitely better ways
  // to do this!
  // TODO: Validate that `srcs` is an array with 2 strings
  return (
    <Wrapper>
      <Image src={srcs[0]} {...meta[0]} />
      <Spacer size={30} />
      <Image src={srcs[1]} {...meta[1]} />
    </Wrapper>
  );
};

export default PhotoSet;
