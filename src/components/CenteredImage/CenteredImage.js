import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  maxwidth: calc(100vw - 64px);
`;

const CenteredImage = ({ width, height, src, alt }) => {
  return (
    <Wrapper>
      <Image src={src} alt={alt} style={{ width, height }} />
    </Wrapper>
  );
};

export default CenteredImage;
