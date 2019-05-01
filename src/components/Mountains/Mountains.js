/**
 * Hero background mountains.
 *
 * TODO: Create 'ClientOnly', and use with 'FadeIn', to only show mountains
 * on the client
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '@constants';
import { random } from '@utils';

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 200;

const generatePeaks = () => {
  // We want 2 peaks
  //              /\
  //            /   \   /\
  //          /      \/   \
  //        /         \    \

  const vh = VIEWBOX_HEIGHT;
  const vw = VIEWBOX_WIDTH;

  return [
    `
      ${random(vw * 0, vw * 0.1)}, ${vh}
      ${random(vw * 0.2, vw * 0.5)}, ${random(vh * 0.2, vh * 0.4)}
      ${random(vw * 0.7, vw * 0.8)}, ${vh}
    `,
    `
      ${random(vw * 0.25, vw * 0.5)}, ${vh}
      ${random(vw * 0.7, vw)}, ${random(0, vh * 0.2)}
      ${random(vw * 1.1, vw * 1.5)}, ${vh}
    `,
  ];
};

class Mountains extends Component {
  state = {
    peaks: generatePeaks(),
  };

  static propTypes = {
    peakColor: PropTypes.string,
    peakOpacity: PropTypes.number,
    baseColor: PropTypes.string,
    baseOpacity: PropTypes.number,
  };

  static defaultProps = {
    peakColor: COLORS.white,
    peakOpacity: 0.5,
    baseColor: COLORS.white,
    baseOpacity: 0,
  };

  render() {
    const { peakColor, peakOpacity, baseColor, baseOpacity } = this.props;

    return (
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: peakColor, stopOpacity: peakOpacity }}
            />
            <stop
              offset="85%"
              style={{ stopColor: baseColor, stopOpacity: baseOpacity }}
            />
          </linearGradient>
        </defs>

        {this.state.peaks.map((points, index) => (
          <polygon key={index} fill="url(#grad1)" points={points} />
        ))}
      </svg>
    );
  }
}

export default Mountains;
