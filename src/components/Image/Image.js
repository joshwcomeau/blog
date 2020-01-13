// TODO: Dedupe with VideoGif
import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';

const Image = ({ src, alt = '', caption = '', ...delegated }) => {
  let mutableAlt = alt || '';
  let mutableCaption = caption;
  const altMatch = mutableAlt.match(/caption=(.+)\|alt=(.+)/i);
  if (!caption && altMatch) {
    mutableCaption = altMatch[1];
    mutableAlt = altMatch[2];
  }

  return (
    <Wrapper>
      <Img src={src} alt={mutableAlt} title={mutableAlt} {...delegated} />
      {mutableCaption && <Caption>{mutableCaption}</Caption>}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: block;
  margin: 40px auto 80px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  border-radius: 5px;

  @media ${BREAKPOINTS.sm} {
    padding: 0;
    border: none;
  }
`;

const Caption = styled.span`
  display: block;
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
