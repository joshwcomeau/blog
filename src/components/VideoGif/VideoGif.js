import React from 'react';
import styled from 'styled-components';

export default ({ src, maxWidth, caption }) => (
  <Wrapper style={{ maxWidth }}>
    <Video autoPlay loop src={src} />
    {caption && <Caption>{caption}</Caption>}
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 40px auto 80px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
`;

const Caption = styled.div`
  padding-top: 6px;
  font-size: 14px;
  text-align: center;
`;

const Video = styled.video`
  width: 100%;
`;
