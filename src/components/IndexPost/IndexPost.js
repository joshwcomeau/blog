/**
 * A post summary, found on the homepage
 */
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '@constants';
import { humanizeDate } from '@helpers/date.helpers';

import Paragraph from '../Paragraph';
import Link from '../Link';

const IndexPost = ({ path, title, abstract, publishedOn }) => {
  return (
    <Wrapper>
      <PostLink href={path}>
        <PostTitle>{title}</PostTitle>
      </PostLink>
      <Date>{humanizeDate(publishedOn)}</Date>
      <Abstract>{abstract} </Abstract>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 72px;
`;

const PostLink = styled(Link)`
  color: ${COLORS.pink[500]};
`;

const PostTitle = styled.h3`
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
  letter-spacing: -1px;
  color: ${COLORS.blue[500]};
  margin: -10px 0 -4px;

  @media ${BREAKPOINTS.sm} {
    font-size: 42px;
  }
`;

const Date = styled.h5`
  font-size: 21px;
  font-weight: 500;
  color: ${COLORS.gray[700]};
  margin-bottom: 24px;
  margin-top: 12px;
`;

const Abstract = styled(Paragraph)`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export default IndexPost;
