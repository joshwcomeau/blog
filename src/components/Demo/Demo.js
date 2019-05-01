// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';

type Updater = (key: string, value: string | number) => void;

type Props = {
  id: string,
  controls: (updateValue: Updater) => React$Node,
  children: (values: any) => React$Node,
};

type State = {
  [key: string]: string | number,
};

class Demo extends Component<Props, State> {
  state = this.props.initialValues;

  updateValue = (key: string, value: string | number) => {
    this.setState({ [key]: value });
  };

  render() {
    const { controls, children } = this.props;

    return (
      <Box>
        <ChildWrapper>{children(this.state)}</ChildWrapper>

        <ControlsWrapper>
          {controls(this.state, this.updateValue)}
        </ControlsWrapper>
      </Box>
    );
  }
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLORS.gray[200]};
  border-radius: 5px;
  margin-bottom: 40px;

  &:hover {
    border-color: #ddd;
  }
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const ControlsWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 15px 30px;
  background: ${COLORS.gray[200]};
  border-radius: 0 0 4px 4px;

  ${Box}:hover & {
    background: #ddd;
  }
`;

export default Demo;
