import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import posts from '../all-posts';
import { COLORS } from '../constants';

import Paragraph from '../components/Paragraph';
import Divider from '../components/Divider';
import Em from '../components/Em';
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
          Hi, I'm <Name>Josh Comeau</Name>. I'm a front-end engineer / web
          developer at{' '}
          <TextLink external href="https://khanacademy.org" target="_blank">
            Khan Academy
          </TextLink>.
        </Paragraph>

        <Paragraph>
          Early in 2018 I released{' '}
          <TextLink
            external={true}
            href="https://pudding.cool/2018/02/waveforms/"
            target="_blank"
          >
            Waveforms
          </TextLink>, an explorable explanation about the peculiar magic of
          sound waves. I got a bunch of feedback aftwerwards from audio folks
          who said that they <Em>finally understood&nbsp;</Em> how sound works,
          that my interactive thingy helped them bridge the gap between
          theoretical knowledge and intuitive understanding.
        </Paragraph>

        <Paragraph>
          This blog is a continuation of that experiment, but for front-end
          programming things. I plan to use it as a way to share experiments and
          ideas, hopefully in a way that makes them easy to learn, digest, and
          use in your own projects!
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
