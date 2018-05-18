import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { iosHome } from 'react-icons-kit/ionicons/iosHome';
import { iosHomeOutline } from 'react-icons-kit/ionicons/iosHomeOutline';

import { COLORS, Z_INDICES, SIZES, BREAKPOINTS } from '../../constants';
import { clamp } from '../../utils';
import { humanizeDate } from '../../helpers/date.helpers';

import MaxWidthWrapper from '../MaxWidthWrapper';
import ClickableIcon from '../ClickableIcon';
import SelfStraighteningCurves from '../SelfStraighteningCurves';

const CURVE_HEIGHT = 140;

class BaseHero extends PureComponent {
  static PropTypes = {
    // Post data
    title: PropTypes.string.isRequired,
    publishedOn: PropTypes.string.isRequired,
    // Hero styles
    gutter: PropTypes.number,
    background: PropTypes.string,
    titleGradientSteps: PropTypes.arrayOf(PropTypes.string),
    authorColor: PropTypes.string,
    publishedOnColor: PropTypes.string,
    curveColors: PropTypes.arrayOf(PropTypes.string),
    // Additional stuff to include, like mountains
    decorations: PropTypes.node,
    // Environment info
    orientation: PropTypes.oneOf(['portrait', 'landscape']),
    headerHeight: PropTypes.number,
  };

  static defaultProps = {
    gutter: 10,
  };

  state = {
    heroScrollPercentage: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.height = this.calculateHeight();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orientation !== this.props.orientation) {
      this.height = this.calculateHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  calculateHeight = () => {
    const { gutter, headerHeight } = this.props;
    // The height will only change when the orientation changes (which affects
    // the size of the gutter, and the )
    return (
      this.node.getBoundingClientRect().height -
      CURVE_HEIGHT -
      gutter -
      headerHeight
    );
  };

  handleScroll = ev => {
    let percentScrolled = window.scrollY / this.height * 100;

    percentScrolled = clamp(percentScrolled, 0, 100);

    if (this.state.heroScrollPercentage !== percentScrolled) {
      this.setState({ heroScrollPercentage: percentScrolled });
    }
  };

  render() {
    const {
      title,
      publishedOn,
      background,
      titleGradientSteps,
      authorColor,
      publishedOnColor,
      curveColors,
      decorations,
      orientation,
    } = this.props;
    const { heroScrollPercentage } = this.state;

    const height = orientation === 'landscape' ? '70vh' : '50vh';
    const gutter = orientation === 'landscape' ? this.props.gutter : 0;

    console.log(gutter);

    return (
      <Wrapper>
        <Hero
          innerRef={node => (this.node = node)}
          height={height}
          gutter={orientation === 'landscape' ? gutter : 0}
          background={background}
        >
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
                {humanizeDate(publishedOn)}
              </PublishedDate>
            </Byline>
          </MaxWidthWrapper>

          {decorations}
        </Hero>

        <HeroSpacer height={height} />

        <CurveWrapper gutter={gutter}>
          <SelfStraighteningCurves
            percentStraightened={heroScrollPercentage}
            colors={curveColors}
            buffer={gutter * 1.5}
          />
        </CurveWrapper>

        {gutter && <CurveBlocker gutter={gutter} />}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: ${Z_INDICES.hero};
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: -5px;
  top: -5px;
  background: ${COLORS.white};
`;

const Hero = styled.section`
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

const HeroSpacer = styled.div`
  position: relative;
  z-index: 1;
  height: ${props => props.height};
`;

const GradientTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  line-height: 6rem;
  letter-spacing: -0.25rem;
  background: -webkit-linear-gradient(${props => props.gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[800]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }

  @media ${BREAKPOINTS.sm} {
    font-size: 3rem;
    line-height: 3rem;
    letter-spacing: -0.1rem;
  }
`;

const Byline = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${COLORS.gray[600]};
  margin: 0.5rem 0 0 0.25rem;

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[800]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }

  @media ${BREAKPOINTS.sm} {
    font-size: 1.2rem;
  }
`;

const Unemphasized = styled.span`
  opacity: 0.85;

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[800]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
`;

const AuthorName = styled.span`
  font-weight: bold;
  color: ${props => props.color};

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[800]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
`;

const PublishedDate = styled.span`
  font-weight: bold;
  color: ${props => props.color};

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[800]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
`;

const CurveWrapper = styled.div`
  position: absolute;
  z-index: 2;
  width: calc(100% - ${props => props.gutter * 2}px);
  min-width: 900px;
  right: ${props => props.gutter}px;
  bottom: 0;
`;

const CurveBlocker = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => props.gutter}px;
  background: ${COLORS.white};
`;

const MainContent = styled.div`
  padding-top: 80px;
`;

export default BaseHero;
