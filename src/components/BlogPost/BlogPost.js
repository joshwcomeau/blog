// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { siteMetadata } from '../../../gatsby-config';

import { COLORS, Z_INDICES, BREAKPOINTS } from 'constants';
import { getDeviceType } from 'helpers/responsive.helpers';

import FullWidth from 'components/FullWidth';
import MaxWidthWrapper from 'components/MaxWidthWrapper';
import Header from 'components/Header';
import WindowDimensions from 'components/WindowDimensions';
import LargeScreenSidebar from 'components/LargeScreenSidebar';
import WatermelonGradientHero from 'components/WatermelonGradientHero';
import Spacer from 'components/Spacer';
import App from 'components/App';

import type { Frontmatter } from 'types';

const HEADER_HEIGHT = 50;

const getHero = heroStyle => {
  switch (heroStyle) {
    case 'watermelon-gradient':
    default:
      return WatermelonGradientHero;
  }
};

type Props = {
  children: React$Node,
  pageContext: {
    frontmatter: Frontmatter,
  },
};

export default ({ children, pageContext }: Props) => {
  const { title, publishedOn, heroStyle } = pageContext.frontmatter;

  const Hero = getHero(heroStyle);
  const deviceType = getDeviceType();

  return (
    <App>
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
    </App>
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
