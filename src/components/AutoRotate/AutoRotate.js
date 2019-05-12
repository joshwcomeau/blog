import React from 'react';
import styled, { keyframes } from 'styled-components';

const animations = {
  X: keyframes`
  from {
    transform: rotateX(0deg);
  }

  to {
    transform: rotateX(360deg)
  }
`,
  Y: keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg)
  }
`,
  Z: keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`,
};

const AutoRotate = ({ axis = 'X', children, ...delegated }) => {
  return (
    <Wrapper axis={axis} {...delegated}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  animation: ${props => animations[props.axis]} 4000ms linear infinite;
  will-change: transform;
`;

export default AutoRotate;
