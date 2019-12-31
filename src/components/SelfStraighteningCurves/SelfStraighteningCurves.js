import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getInterpolatedValue } from '@utils';

// NOTE: This should be dynamic, but I did things hacky.
const HEIGHT = 140;

class SelfStraighteningCurves extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
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
        const originPoint = getInterpolatedValue(120, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-40, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(220, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(0, 0, progressRatio);

        return `
          M 0,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1000,${destinationPoint}
          L 1000,120
          L 0, 120
        `;
      }

      case 'secondary': {
        const originPoint = getInterpolatedValue(119, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-35, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(195, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(40, 0, progressRatio);

        return `
          M 0,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1000,${destinationPoint}
          L 1000,120
          L 0, 120
        `;
      }

      case 'primary': {
        const originPoint = getInterpolatedValue(120, 0, progressRatio);
        const controlPoint1 = getInterpolatedValue(-30, 0, progressRatio);
        const controlPoint2 = getInterpolatedValue(190, 0, progressRatio);
        const destinationPoint = getInterpolatedValue(65, 0, progressRatio);

        return `
          M -1,${originPoint}
          C 150,${controlPoint1} 666,${controlPoint2} 1001,${destinationPoint}
          L 1001,120
          L -1,120
        `;
      }

      default: {
        throw new Error(`Unrecognized curveId: ${curveId}`);
      }
    }
  };

  render() {
    const {
      colors: [firstColor, secondColor, thirdColor],
    } = this.props;

    return (
      <Svg
        width="100%"
        height={HEIGHT}
        ref={node => (this.node = node)}
        viewBox="0 0 1000 120"
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
