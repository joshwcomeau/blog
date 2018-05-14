import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import posts from '../all-posts';
import { COLORS } from '../constants';

import Paragraph from '../components/Paragraph';
import Divider from '../components/Divider';
import TextLink from '../components/TextLink';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import IndexPost from '../components/IndexPost';
import Mountains from '../components/Mountains';
import Logo from '../components/Logo';

const IndexPage = () => (
  <Wrapper>
    <Helmet
      title={siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: 'Web development and front-end engineering blog.',
        },
        {
          name: 'keywords',
          content: 'reactjs, javascript, front-end, web development',
        },
      ]}
    />
    <BorderWrapper>
      <InnerWrapper>
        <Title>Hey look, it's a blog!</Title>
        <Paragraph>
          Hi, I'm <Name>Josh Comeau</Name>. I'm a front-end engineer at{' '}
          <TextLink external={true} href="https://khanacademy.org">
            Khan Academy
          </TextLink>.<br />I started using React.js in 2014, and I haven't
          stopped experimenting with it since.
        </Paragraph>
        <Paragraph>
          This is my developer blog. I hope you find it useful!
        </Paragraph>

        <Divider />

        {posts.map(post => <IndexPost key={post.slug} {...post} />)}
      </InnerWrapper>
    </BorderWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  /* margin: 10px 10px 0; */
  padding: 10px;
  background: linear-gradient(
    120deg,
    ${COLORS.pink[500]},
    ${COLORS.purple[500]}
  );
`;

const BorderWrapper = styled.div`
  position: relative;
  padding: 15vh 0 5vh;
  background: #fff;
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  position: relative;
  padding: 40px 0;
  color: ${COLORS.gray[900]};
`;

const Title = styled.h1`
  margin-bottom: 48px;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2.4px;
`;

const Name = styled.span`
  font-weight: 600;
  color: ${COLORS.pink[500]};
  letter-spacing: -0.5px;
`;

const Heading = styled.h2`
  margin-bottom: 3rem;
  font-size: 48px;
  letter-spacing: -1px;
`;

export default IndexPage;
