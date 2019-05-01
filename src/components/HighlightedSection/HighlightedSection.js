// @flow
/**
 * NOTE: Currently Unused
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

import FullWidth from '../FullWidth';
import MaxWidthWrapper from '../MaxWidthWrapper';

type Props = {
  background: string,
  children: React$Node,
};

class LandingPageHighlightedSection extends Component<Props> {
  static defaultProps = {
    background: COLORS.gray[800],
  };

  render() {
    const { background, children } = this.props;

    return (
      <FullWidth>
        <Wrapper style={{ background }}>
          <TopSVG preserveAspectRatio="none" viewBox="0 0 1000 60">
            <path
              d={`
              M 0,0
              C 200,-60 800,50 1000,30
              L 1000,60
              L 0,60
            `}
              fill={background}
            />
          </TopSVG>

          <MaxWidthWrapper>{children}</MaxWidthWrapper>

          <BottomSVG preserveAspectRatio="none" viewBox="0 0 1000 60">
            <path
              d={`
              M 0,60
              Q 500 -40 1000,30
              L 1000,0
              L 0,0
            `}
              fill={background}
            />
          </BottomSVG>
        </Wrapper>
      </FullWidth>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 2rem;
  margin: 100px 0;
`;

const TopSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-99%);
  overflow: visible;
`;

const BottomSVG = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(99%);
  overflow: visible;
`;

export default LandingPageHighlightedSection;
