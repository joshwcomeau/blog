import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import posts from './posts/all-posts';
import { COLORS } from '../constants';

import Paragraph from '../components/Paragraph';
import Link from '../components/Link';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import IndexPost from '../components/IndexPost';

const IndexPage = () => (
  <Wrapper>
    <BorderWrapper>
      <InnerWrapper>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Title>Hey look, it's a blog!</Title>
        <Paragraph>
          I'm Josh. I'm a front-end engineer / web developer at{' '}
          <Link external={true} href="https://khanacademy.org">
            Khan Academy
          </Link>. I've been an avid React.js fan since 2014, and I do a lot of
          wild experiments with animation and interactions.
        </Paragraph>
        <Paragraph>This is my developer blog. I hope you enjoy it.</Paragraph>

        <Divider />

        {posts.map(post => <IndexPost key={post.slug} {...post} />)}
      </InnerWrapper>
    </BorderWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 10px;
  padding: 10px;
  background: linear-gradient(
    120deg,
    ${COLORS.pink[500]},
    ${COLORS.purple[500]}
  );
`;

const BorderWrapper = styled.div`
  padding: 15vh 0;
  background: #fff;
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  position: relative;
  padding: 40px 0;
  color: ${COLORS.gray[900]};
  background: #fff;
`;

const Title = styled.h1`
  margin-bottom: 48px;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2.4px;
  /* background: -webkit-linear-gradient(
    80deg,
    ${COLORS.pink[500]},
    ${COLORS.purple[500]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`;

const Divider = styled.div`
  margin: 72px auto 48px;
  max-width: 200px;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  margin-bottom: 3rem;
  font-size: 48px;
  letter-spacing: -1px;
`;

export default IndexPage;
