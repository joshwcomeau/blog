// @flow
import React, { Component } from 'react';

import { COLORS } from 'constants';

console.log(COLORS);

class MultipleChoiceControl extends Component {
  render() {
    return <div style={{ color: COLORS.red[500] }}>Hello world</div>;
  }
}

export default MultipleChoiceControl;
