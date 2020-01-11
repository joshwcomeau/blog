import React from 'react';
import styled from 'styled-components';

import LazyGeyser from '@components/ConfettiGeyser/LazyGeyser';

const ConfettiGeyserDemo = ({ concentration = 20 }) => {
  const width = Math.min(window.innerWidth, 784);
  const height = 500;

  return (
    <Wrapper style={{ height }}>
      <LazyGeyser
        width={width}
        height={height}
        position={[width / 2, height]}
        enableCollisions={true}
        airFriction={0.1}
        velocity={40}
        angularVelocity={0.3}
        angle={-90}
        spread={5}
        volatility={0.6}
        concentration={concentration}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: #222;
`;

export default ConfettiGeyserDemo;
