import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { clamp, getInterpolatedValue } from '../utils';

class SelfStraighteningCurves extends Component {
  state = {
    percentScrolledToMainContent: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    // We can assume that the distance between the top of the document and
    // the start of the main content is static; it doesn't update after
    // mount, not even for resizing (well, it does a little bit, but not
    // enough to matter).
    this.maxDistanceToContent =
      this.node.getBoundingClientRect().top + window.scrollY;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = ev => {
    let percentScrolled = window.scrollY / this.maxDistanceToContent * 100;

    percentScrolled = clamp(percentScrolled, 0, 100);

    if (this.state.percentScrolledToMainContent !== percentScrolled) {
      this.setState({ percentScrolledToMainContent: percentScrolled });
    }
  };

  calculatePathForCurve = curveId => {
    const { percentScrolledToMainContent } = this.state;

    const progressRatio = percentScrolledToMainContent / 100;

    switch (curveId) {
      case 'tertiary': {
        const originPoint = getInterpolatedValue(60, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-100, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(160, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(-40, 0, progressRatio);

        return `
          M 0,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1000,${destinationPoint}
          L 1000,60
          L 0, 60
        `;
      }

      case 'secondary': {
        const originPoint = getInterpolatedValue(59, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-100, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(135, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(-10, 0, progressRatio);

        return `
          M 0,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1000,${destinationPoint}
          L 1000,60
          L 0, 60
        `;
      }

      case 'primary': {
        const originPoint = getInterpolatedValue(60, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-90, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(130, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(5, 0, progressRatio);

        return `
          M 0,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1000,${destinationPoint}
          L 1000,60
          L 0,60
        `;
      }

      default: {
        throw new Error(`Unrecognized curveId: ${curveId}`);
      }
    }
  };

  render() {
    const { percentScrolledToMainContent } = this.state;

    return (
      <Svg innerRef={node => (this.node = node)} viewBox="0 0 1000 60">
        <path
          d={this.calculatePathForCurve('tertiary')}
          stroke="none"
          fill={COLORS.green[500]}
        />
        <path
          d={this.calculatePathForCurve('secondary')}
          stroke="none"
          fill={COLORS.green[700]}
        />
        <path
          d={this.calculatePathForCurve('primary')}
          stroke="none"
          fill="#FFF"
        />
      </Svg>
    );
  }
}

const Svg = styled.svg`
  display: block;
  overflow: visible;
`;

export default SelfStraighteningCurves;
