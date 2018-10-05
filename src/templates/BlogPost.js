import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { COLORS, Z_INDICES, BREAKPOINTS } from '../constants';
import { siteMetadata } from '../../gatsby-config';
import { getDeviceType } from '../helpers/responsive.helpers';

import FullWidth from '../components/FullWidth';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import Header from '../components/Header';
import WindowDimensions from '../components/WindowDimensions';
import LargeScreenSidebar from '../components/LargeScreenSidebar';
import WatermelonGradientHero from '../components/WatermelonGradientHero';
import Spacer from '../components/Spacer';
import Layout from '../components/MainLayout';

const HEADER_HEIGHT = 50;

const getHero = heroStyle => {
  switch (heroStyle) {
    case 'watermelon-gradient':
    default:
      return WatermelonGradientHero;
  }
};

export default ({ title, publishedOn, heroStyle, heroImage, children }) => {
  const Hero = getHero(heroStyle);
  const deviceType = getDeviceType();

  return (
    <Layout>
      <FullWidth>
        <Helmet>
          <title>
            {title} - {siteMetadata.title}
          </title>
        </Helmet>

        <Header
          height={HEADER_HEIGHT}
          title={title}
          publishedOn={publishedOn}
          heroStyle={heroStyle}
        />
        <WindowDimensions>
          {({ windowWidth, windowHeight }) => {
            const orientation =
              windowWidth >= windowHeight ? 'landscape' : 'portrait';

            return (
              <Hero
                headerHeight={HEADER_HEIGHT}
                title={title}
                publishedOn={publishedOn}
                image={heroImage}
                orientation={orientation}
              />
            );
          }}
        </WindowDimensions>

        <MainContent>
          <MaxWidthWrapper>
            {deviceType === 'desktop' && <LargeScreenSidebar title={title} />}
            {children}
          </MaxWidthWrapper>

          <Spacer size={160} />
        </MainContent>
      </FullWidth>
    </Layout>
  );
};

const Hero = styled.div`
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
  position: relative;
  background: ${COLORS.white};
  z-index: ${Z_INDICES.mainContent};
  padding-top: 150px;

  @media ${BREAKPOINTS.sm} {
    padding-top: 75px;
  }
`;

const MountainsWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
`;
