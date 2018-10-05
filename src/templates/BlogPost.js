import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

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

const MainContent = styled.div`
  position: relative;
  background: ${COLORS.white};
  z-index: ${Z_INDICES.mainContent};
  padding-top: 150px;

  @media ${BREAKPOINTS.sm} {
    padding-top: 75px;
  }
`;
