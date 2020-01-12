// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { iosFlask } from 'react-icons-kit/ionicons/iosFlask';

import { COLORS } from '@constants';
import { deepEqual } from '@utils';

type Updater = (key: string, value: string | number) => void;

type Props = {
  id: string,
  controls?: (updateValue: Updater) => React$Node,
  children: (values: any) => React$Node,
  includeResetButton: boolean,
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
    const {
      controls,
      style,
      width,
      caption,
      opaqueControls,
      children,
      includeResetButton,
      noPadding,
    } = this.props;

    const shouldShowReset =
      includeResetButton && !deepEqual(this.state, this.props.initialValues);

    return (
      <>
        <Box style={{ maxWidth: width }}>
          <ResetButton
            style={{
              opacity: shouldShowReset ? 1 : 0,
              pointerEvents: shouldShowReset ? 'auto' : 'none',
            }}
            disabled={!shouldShowReset}
            onClick={() => {
              this.setState(this.props.initialValues);
            }}
          >
            Reset
          </ResetButton>

          <ChildWrapper noPadding={noPadding} style={style}>
            {children(this.state)}
          </ChildWrapper>

          {controls && (
            <ControlsWrapper opaque={opaqueControls}>
              {controls(this.state, this.updateValue)}
            </ControlsWrapper>
          )}
        </Box>
        {caption && (
          <InteractivityNotice>
            <IconWrapper>
              <Icon size={32} icon={iosFlask} />
            </IconWrapper>
            {caption}
          </InteractivityNotice>
        )}
      </>
    );
  }
}

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLORS.gray[200]};
  border-radius: 5px;
  margin: auto;
  margin-bottom: 40px;
  overflow: hidden;

  &:hover {
    border-color: #ddd;
  }
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: ${p => (p.noPadding ? 0 : '30px')};
`;

const ControlsWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 15px 30px;
  background: ${props =>
    props.opaque ? 'rgba(215, 215, 215, 1)' : 'rgba(215, 215, 215, 0.7)'};
  border-radius: 0 0 4px 4px;

  ${Box}:hover & {
    background: ${props =>
      props.opaque ? 'rgba(215, 215, 215, 1)' : 'rgba(215, 215, 215, 0.92)'};
  }
`;

const InteractivityNotice = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  color: ${COLORS.pink[500]};
`;

const ResetButton = styled.button`
  position: absolute;
  z-index: 3;
  top: 20px;
  right: 20px;
  padding: 5px 20px;
  border: none;
  background: transparent;
  color: #555;
  border-radius: 10px;
  font-size: 18px;
  transition: opacity 250ms;
  cursor: pointer;

  &:hover {
    background: #eee;
    color: #222;
  }
`;

export default Demo;
