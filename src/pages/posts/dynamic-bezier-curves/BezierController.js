import React, { PureComponent } from 'react';

import Bezier from './Bezier';

class BezierController extends PureComponent {
  state = {
    viewBoxWidth: 1000,
    viewBoxHeight: 250,
    p1: [50, 50],
    p2: [333, -10],
    p3: [666, 260],
    p4: [900, 125],
  };

  handleUpdatePoint = (pointId, pointCoords) => {
    this.setState({ [pointId]: pointCoords });
  };

  render() {
    const { viewBoxWidth, viewBoxHeight, p1, p2, p3, p4 } = this.state;
    return (
      <Bezier
        viewBoxWidth={viewBoxWidth}
        viewBoxHeight={viewBoxHeight}
        points={[p1, p2, p3, p4]}
        updatePoint={this.handleUpdatePoint}
      />
    );
  }
}

export default BezierController;
