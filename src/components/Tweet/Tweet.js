import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import styled from 'styled-components';

import { COLORS } from '@constants';

import MobileOnly from '../MobileOnly';
import DesktopOnly from '../DesktopOnly';

const Tweet = ({ id, body, author }) => {
  const href = `https://twitter.com/${author}/status/${id}`;

  return (
    <>
      <DesktopOnly>
        <TweetEmbed id={id} />
      </DesktopOnly>
      <MobileOnly>
        <MobileWrapper href={href} target="_blank">
          <Body>{body}</Body>
          <Author>@{author}</Author>
        </MobileWrapper>
      </MobileOnly>
    </>
  );
};

const MobileWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 1px solid #eee;
  margin-bottom: 30px;
  text-decoration: none;
`;

const Body = styled.div`
  font-size: 24px;
  color: ${COLORS.gray[700]};
`;
const Author = styled.div`
  font-size: 18px;
  color: ${COLORS.gray[500]};
`;

export default Tweet;
