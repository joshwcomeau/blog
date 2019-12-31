import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getInterpolatedValue } from '@utils';

class InitialCurve extends Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    buffer: PropTypes.number,
    percentStraightened: PropTypes.number,
  };

  static defaultProps = {
    height: 200,
    buffer: 0,
  };

  calculatePathForCurve = curveId => {
    const { percentStraightened } = this.props;

    const progressRatio = percentStraightened / 100;

    const originPoint = Math.round(getInterpolatedValue(0, 0, progressRatio));
    const controlPoint1 = Math.round(
      getInterpolatedValue(350, 0, progressRatio)
    );
    const controlPoint2 = Math.round(
      getInterpolatedValue(-90, 0, progressRatio)
    );
    const destinationPoint = Math.round(
      getInterpolatedValue(200, 0, progressRatio)
    );

    return `
      M 0,${originPoint}
      C 240,${controlPoint1} 432,${controlPoint2} 720,${destinationPoint}
    `;
  };

  render() {
    const { height, color } = this.props;

    return (
      <Svg
        width="100%"
        height={height}
        ref={node => (this.node = node)}
        viewBox="0 0 720 200"
      >
        <path
          d={this.calculatePathForCurve()}
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
}

const Svg = styled.svg`
  display: block;
  overflow: visible;
  box-sizing: content-box;
`;

export default InitialCurve;
