// TODO: Dedupe with VideoGif
import React from 'react';
import styled from 'styled-components';

const Image = ({ src, caption, ...delegated }) => (
  <Wrapper>
    <Img src={src} {...delegated} />
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

const Img = styled.img`
  display: block;
  width: 100%;
  border-radius: 3px;
  margin: auto; /* In case width is overridden, center it */
`;

export default Image;
