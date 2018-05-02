import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { COLORS, Z_INDICES } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Mountains from '../Mountains';
import SelfStraighteningCurves from '../SelfStraighteningCurves';

const PostHeader = ({
  // Post data
  title,
  publishedOn,
  // Header styles
  height = '70vh',
  gutter = 10,
  background,
  titleGradientSteps,
  authorColor,
  publishedOnColor,
  curveColors,
  // Additional stuff to include, like mountains
  decorations,
}) => (
  <Wrapper>
    <Header height={height} gutter={gutter} background={background}>
      <MaxWidthWrapper>
        {/* TODO: Support other kinds of titles? */}
        <GradientTitle gradient={titleGradientSteps.join(', ')}>
          {title}
        </GradientTitle>
        <Byline>
          <Unemphasized>Written by</Unemphasized>{' '}
          <AuthorName color={authorColor}>Josh Comeau</AuthorName>
          <Unemphasized> on</Unemphasized>{' '}
          <PublishedDate color={publishedOnColor}>
            {format(parse(publishedOn), 'MMMM Mo, YYYY')}
          </PublishedDate>
        </Byline>
      </MaxWidthWrapper>

      <MountainsWrapper>
        <Mountains />
      </MountainsWrapper>
    </Header>

    <HeaderSpacer height={height} />

    <CurveWrapper gutter={gutter}>
      <SelfStraighteningCurves colors={curveColors} buffer={gutter * 1.5} />
    </CurveWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  z-index: ${Z_INDICES.header};
`;

const Header = styled.header`
  position: fixed;
  top: ${props => props.gutter}px;
  left: ${props => props.gutter}px;
  right: ${props => props.gutter}px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: ${props => props.height};
  background: ${props => props.background};
`;

const HeaderSpacer = styled.div`
  position: relative;
  z-index: 1;
  height: ${props => props.height};
`;

const GradientTitle = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: -0.25rem;
  background: -webkit-linear-gradient(${props => props.gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  color: ${props => props.color};
`;

const PublishedDate = styled.span`
  font-weight: bold;
  color: ${props => props.color};
`;

const CurveWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: ${props => props.gutter}px;
  right: ${props => props.gutter}px;
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

export default PostHeader;
