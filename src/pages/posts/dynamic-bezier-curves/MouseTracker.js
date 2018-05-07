import React, { PureComponent } from 'react';
import { clamp } from '../../../utils';

class MouseTracker extends PureComponent {
  state = {
    y: 0,
  };

  updateMousePosition = ev => {
    const y = ev.clientY;
    const bb = this.node.getBoundingClientRect();

    const relativeY = y - bb.top;
    const percentageY = relativeY / bb.height * 100;

    const constrainedY = clamp(percentageY, 0, 100);

    this.setState({ y: constrainedY });
  };

  render() {
    const { y } = this.state;

    return (
      <div
        ref={node => (this.node = node)}
        onMouseMove={this.updateMousePosition}
      >
        {this.props.children({ y })}
      </div>
    );
  }
}

export default MouseTracker;
