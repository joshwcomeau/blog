import React from 'react';
import styled from 'styled-components';

export default ({ src, maxWidth, caption }) => (
  <Wrapper style={{ maxWidth }}>
    <Video autoPlay loop controls muted src={src} />
    {caption && <Caption>{caption}</Caption>}
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 40px auto 80px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  border-radius: 5px;
`;

const Caption = styled.div`
  padding-top: 6px;
  font-size: 14px;
  text-align: center;
`;

const Video = styled.video`
  display: block;
  max-width: 100%;
  margin: auto;
  border-radius: 3px;
`;
