import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { COLORS } from '@constants';

class MagicGradientButton extends Component {
  render() {
    const { children, ...delegated } = this.props;

    return (
      <ButtonElem {...delegated}>
        <ChildWrapper>{children}</ChildWrapper>
        <Gradient />
      </ButtonElem>
    );
  }
}

const gradientGo = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(-940px); }
`;

const ButtonElem = styled.button`
  position: relative;
  border: none;
  color: white;
  overflow: hidden;
`;

const ChildWrapper = styled.span`
  position: relative;
  z-index: 2;
`;

const Gradient = styled.span`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  height: 1000px;
  background: linear-gradient(
    -8deg,
    ${COLORS.red[500]},
    ${COLORS.orange[500]},
    ${COLORS.yellow[700]},
    ${COLORS.green[500]},
    ${COLORS.blue[500]},
    ${COLORS.purple[500]},
    ${COLORS.pink[500]},
    ${COLORS.red[500]},
    ${COLORS.orange[500]}
  );
  animation: ${gradientGo} 15s linear infinite;
`;

export default MagicGradientButton;
