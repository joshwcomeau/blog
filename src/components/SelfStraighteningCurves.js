import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../constants';
import { clamp, getInterpolatedValue } from '../utils';

class SelfStraighteningCurves extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.number,
    buffer: PropTypes.number,
    percentStraightened: PropTypes.number,
  };

  static defaultProps = {
    buffer: 0,
  };

  calculatePathForCurve = curveId => {
    const { percentStraightened } = this.props;

    const progressRatio = percentStraightened / 100;

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
          M -1,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1001,${destinationPoint}
          L 1001,60
          L -1,60
        `;
      }

      default: {
        throw new Error(`Unrecognized curveId: ${curveId}`);
      }
    }
  };

  render() {
    const {
      height,
      colors: [firstColor, secondColor, thirdColor],
    } = this.props;

    return (
      <Svg
        width="100%"
        height={70}
        innerRef={node => (this.node = node)}
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
      >
        <path
          d={this.calculatePathForCurve('tertiary')}
          stroke="none"
          fill={thirdColor}
        />
        <path
          d={this.calculatePathForCurve('secondary')}
          stroke="none"
          fill={secondColor}
        />
        <path
          d={this.calculatePathForCurve('primary')}
          stroke="none"
          fill={firstColor}
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
