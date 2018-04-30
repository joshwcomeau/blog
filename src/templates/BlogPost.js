import React from 'react';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { COLORS } from '../constants';

import FullWidth from '../components/FullWidth';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import PostTitle from '../components/PostTitle';
import Mountains from '../components/Mountains';
import SelfStraighteningCurves from '../components/SelfStraighteningCurves';

export default ({
  title,
  publishedOn,
  headerType,
  headerImage,
  headerBackground,
  headerTitleGradientSteps,
  children,
}) => (
  <FullWidth>
    <Header background={headerBackground}>
      <MaxWidthWrapper>
        <PostTitle gradientSteps={headerTitleGradientSteps}>{title}</PostTitle>
        <Byline>
          <Unemphasized>Written by</Unemphasized>{' '}
          <AuthorName>Josh Comeau</AuthorName>
          <Unemphasized> on</Unemphasized>{' '}
          <PublishedDate>
            {format(parse(publishedOn), 'MMMM Mo, YYYY')}
          </PublishedDate>
        </Byline>
      </MaxWidthWrapper>

      <CurveWrapper>
        <SelfStraighteningCurves />
      </CurveWrapper>

      <MountainsWrapper>
        <Mountains />
      </MountainsWrapper>
    </Header>

    <MainContent>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </MainContent>
  </FullWidth>
);

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50vh;
  margin: 0.5rem;
  background: ${props => props.background};
`;

const Byline = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${COLORS.gray[600]};
  margin: 0.5rem 0 0 0.25rem;
`;

const Unemphasized = styled.span`
  opacity: 0.85;
`;

const AuthorName = styled.span`
  font-weight: bold;
  color: ${COLORS.pink[500]};
`;

const PublishedDate = styled.span`
  font-weight: bold;
  color: #651fff;
  opacity: 0.8;
`;

const CurveWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MainContent = styled.div`
  padding-top: 5rem;
  height: 100vh; /* temp */
`;

const MountainsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
`;
