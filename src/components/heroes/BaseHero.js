import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { COLORS, Z_INDICES } from '../../constants';
import { clamp } from '../../utils';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Mountains from '../Mountains';
import SelfStraighteningCurves from '../SelfStraighteningCurves';

const CURVE_HEIGHT = 70;

class BaseHero extends PureComponent {
  static PropTypes = {
    // Post data
    title: PropTypes.string.isRequired,
    publishedOn: PropTypes.string.isRequired,
    // Hero styles
    height: PropTypes.number,
    gutter: PropTypes.number,
    background: PropTypes.string,
    titleGradientSteps: PropTypes.arrayOf(PropTypes.string),
    authorColor: PropTypes.string,
    publishedOnColor: PropTypes.string,
    curveColors: PropTypes.arrayOf(PropTypes.string),
    // Additional stuff to include, like mountains
    decorations: PropTypes.node,
  };

  static defaultProps = {
    height: '70vh',
    gutter: 10,
  };

  state = {
    heroScrollPercentage: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    // I know that the hero height will never change.
    // Rather than compute the node's height on every scroll, I'm caching it
    // on the instance.
    this.height =
      this.node.getBoundingClientRect().height -
      CURVE_HEIGHT -
      this.props.gutter;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

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
      height,
      gutter,
      background,
      titleGradientSteps,
      authorColor,
      publishedOnColor,
      curveColors,
      decorations,
    } = this.props;
    const { heroScrollPercentage } = this.state;

    return (
      <Wrapper>
        <Hero
          innerRef={node => (this.node = node)}
          height={height}
          gutter={gutter}
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
                {format(parse(publishedOn), 'MMMM Mo, YYYY')}
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

        <CurveBlocker gutter={gutter} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: ${Z_INDICES.hero};
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
  font-size: 6rem;
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
  padding-top: 5rem;
  height: 100vh; /* temp */
`;

export default BaseHero;
