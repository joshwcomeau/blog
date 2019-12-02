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
  isPublished: boolean,
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
              </TextLink>
              . I'm a front-end software developer at{' '}
              <TextLink href="https://www.gatsbyjs.com/" target="_blank">
                Gatsby
              </TextLink>
              .
            </Paragraph>

            <Paragraph>
              This blog started as a place for interactive, explorable
              tutorials. It's still kind of that, though the scope has grown a
              bit. Now I view it as my super-powered Medium alternative. Some
              posts will be{' '}
              <TextLink href="/posts/folding-the-dom/">
                full of rich, interactive widgets
              </TextLink>
              , while others will be{' '}
              <TextLink href="/posts/remote-work/">
                traditional "blog" fare
              </TextLink>
              .
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
                I believe that the best way to learn something is through
                experimentation. The posts on this blog aim to put control in
                your hands, to play with sliders and tinker with editable code.
                It's been a really fun journey, and I'm excited about being able
                to create more posts!
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
      const isAPost = node && node.context && !!node.context.frontmatter;

      if (!isAPost) {
        return null;
      }

      // Don't show unpublished posts!
      if (!node.context.frontmatter.isPublished) {
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
              isPublished
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
