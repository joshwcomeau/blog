// @flow
import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import { siteMetadata } from '../../gatsby-config';
import { COLORS, BREAKPOINTS } from '../constants';

import App from '../components/App';
import Paragraph from '../components/Paragraph';
import Divider from '../components/Divider';
import Em from '../components/Em';
import TextLink from '../components/TextLink';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import IndexPost from '../components/IndexPost';
import SectionHeading from '../components/SectionHeading';
import NewsletterSignup from '../components/NewsletterSignup';
import Spacer from '../components/Spacer';

type PostData = {
  id: string,
  path: string,
  title: string,
  abstract: string,
  published: boolean,
  publishedOn: string,
};

const IndexPage = ({ data }) => {
  const posts = getPosts(data);

  return (
    <App>
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
              Hi, I'm{' '}
              <TextLink href="https://www.twitter.com/joshwcomeau">
                Josh Comeau
              </TextLink>. I'm a front-end engineer / web developer at{' '}
              <TextLink href="https://khanacademy.org" target="_blank">
                Khan Academy
              </TextLink>.
            </Paragraph>

            <Paragraph>
              Early in 2018 I released{' '}
              <TextLink
                href="https://pudding.cool/2018/02/waveforms/"
                target="_blank"
              >
                Waveforms
              </TextLink>, an explorable explanation about the peculiar magic of
              sound waves. I got a bunch of feedback aftwerwards from audio
              folks who said that they <Em>finally understood</Em> how sound
              works, that my interactive thingy helped them bridge the gap
              between theoretical knowledge and intuitive understanding.
            </Paragraph>

            <Paragraph>
              This blog is a continuation of that experiment, but for front-end
              programming things. I plan to use it as a way to share experiments
              and ideas, hopefully in a way that makes them easy to learn,
              digest, and use in your own projects!
            </Paragraph>

            <Divider />

            {posts.map(post => (
              <IndexPost
                key={post.id}
                id={post.id}
                path={post.path}
                title={post.title}
                abstract={post.abstract}
                publishedOn={post.publishedOn}
              />
            ))}

            <Divider />

            <NewsletterWrapper>
              <SectionHeading anchorId="join">
                Join the Newsletter 🗞
              </SectionHeading>

              <Spacer size={20} />

              <Paragraph>
                I'm having so much fun building dynamic, interactive tutorials
                and deep-dives! I've only written the first post so far, but I
                have a bunch of ideas for other stuff to cover.
              </Paragraph>

              <Paragraph>
                If this stuff interests you as well, you can join the
                newsletter. I'll let you know when new posts are up (in fact,
                subscribers will get sneak peeks!).
              </Paragraph>

              <Paragraph>
                It also sends a strong signal to me that this stuff is worth
                building, and will likely motivate me to create more content!
              </Paragraph>

              <NewsletterSignup id="homepage" />
            </NewsletterWrapper>
          </InnerWrapper>
        </BorderWrapper>
      </Wrapper>
    </App>
  );
};

const sortDatesDescending = (a, b) => {
  return a.publishedOn > b.publishedOn ? -1 : 1;
};

const getPosts = (data: any): Array<PostData> =>
  data.allSitePage.edges
    .map(edge => {
      const { node } = edge;

      // Not all site pages are posts.
      // We can identify posts because they have frontmatter.
      const isAPost = !!node.context.frontmatter;

      if (!isAPost) {
        return null;
      }

      return {
        id: node.id,
        path: node.path,
        title: node.context.frontmatter.title,
        publishedOn: node.context.frontmatter.publishedOn,
        abstract: node.context.frontmatter.abstract,
      };
    })
    .filter(post => !!post)
    .sort(sortDatesDescending);

export const query = graphql`
  query AllPosts {
    allSitePage {
      edges {
        node {
          id
          path
          context {
            frontmatter {
              title
              published
              publishedOn
              abstract
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  background: linear-gradient(
    120deg,
    ${COLORS.pink[500]},
    ${COLORS.purple[500]}
  );

  @media ${BREAKPOINTS.sm} {
    padding: 6px;
  }
`;

const BorderWrapper = styled.div`
  position: relative;
  padding: 15vh 0 5vh;
  background: #fff;

  @media ${BREAKPOINTS.sm} {
    padding: 10vh 0 5vh;
  }
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  position: relative;
  padding: 40px 20px;
  color: ${COLORS.gray[900]};
`;

const Title = styled.h1`
  margin-bottom: 48px;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2.4px;

  @media ${BREAKPOINTS.sm} {
    font-size: 3.5rem;
    letter-spacing: -1px;
  }
`;

const NewsletterWrapper = styled.div`
  background: ${COLORS.gray[50]};
  padding: 48px;
`;

export default IndexPage;
