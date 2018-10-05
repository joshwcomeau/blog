import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import Bezier from '../Bezier';

const springSettings = { stiffness: 60, damping: 15 };

class BezierFlattener extends PureComponent {
  state = {
    flattened: false,
  };

  componentDidMount() {
    this.intervalId = window.setInterval(this.tick, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  tick = () => {
    this.setState({ flattened: !this.state.flattened });
  };

  render() {
    const { flattened } = this.state;

    return (
      <Motion
        style={{
          y1: spring(flattened ? 200 : 0, springSettings),
          y2: spring(flattened ? 200 : 400, springSettings),
        }}
      >
        {({ y1, y2 }) => (
          <Bezier
            viewBoxWidth={1000}
            viewBoxHeight={400}
            points={[[25, 200], [333, y1], [666, y2], [975, 200]]}
            grabbable={false}
          />
        )}
      </Motion>
    );
  }
}

export default BezierFlattener;
