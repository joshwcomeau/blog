import React from 'react';
import styled, { keyframes } from 'styled-components';

import { COLORS } from '@constants';
import { normalize } from '@utils';

import Demo from '@components/Demo';
import SliderControl from '@components/SliderControl';

const OldMethod = () => {
  return (
    <Demo
      caption="This is an interactive demo! Try dragging the slider to reveal."
      opaqueControls
      id="old-rainbow-method"
      initialValues={{ rotation: 0 }}
      style={{ padding: 0 }}
      width={400}
      controls={(values, updateValue) => {
        return (
          <SliderControl
            id="rotation"
            label="Reveal"
            min={0}
            max={70}
            value={values.rotation}
            updateValue={updateValue}
          />
        );
      }}
    >
      {({ rotation }) => {
        const opacity = normalize(rotation, 0, 80, 1, 0.75);
        return (
          <Parent>
            <Wrapper
              style={{
                transform: `rotateY(${rotation * -0.5}deg)`,
              }}
            >
              <Front
                includeBoxShadow={rotation > 0}
                style={{
                  transform: `translateZ(${rotation * 0.2}px)`,
                }}
              >
                <Backdrop style={{ height: 100, opacity }} />
                <Row>
                  <Backdrop style={{ height: 60, opacity }} />
                  <Button>Subscribe</Button>
                  <Backdrop style={{ height: 60, opacity }} />
                </Row>
                <Backdrop style={{ height: 100, opacity }} />
              </Front>

              <Back
                style={{
                  transform: `translateZ(-${rotation * 0.2}px)`,
                }}
              >
                <RainbowGradient />
              </Back>
            </Wrapper>
          </Parent>
        );
      }}
    </Demo>
  );
};

const Parent = styled.div`
  flex: 1;
  width: 100%;
  max-width: 300px;

  perspective: 500px;
  transform-style: preserve-3d;
`;

const Wrapper = styled.div`
  position: relative;
  height: 260px;
  transform-style: preserve-3d;
  perspective: 500px;
  transform-origin: center center;
`;

const Backdrop = styled.div`
  background: #fff;
`;

const Row = styled.div`
  display: flex;

  div {
    flex: 1;
  }

  button {
    flex: 2;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 60px;
  border: none;
  color: white;
  font-size: 21px;
`;

const Front = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  box-shadow: ${p =>
    p.includeBoxShadow &&
    `0 0.9px 1.2px rgba(0, 0, 0, 0.05),
    0 3.5px 3.4px rgba(0, 0, 0, 0.027), 0 10.8px 8.1px rgba(0, 0, 0, 0.02),
    0 46px 27px rgba(0, 0, 0, 0.014)`};
`;
const Back = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform-origin: center center;
`;

const gradientGo = keyframes`
  from { transform: translateY(25%); }
  to { transform: translateY(-45%); }
`;

const RainbowGradient = styled.div`
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  bottom: 0;
  display: block;
  height: 400px;
  background: linear-gradient(
    -188deg,
    ${COLORS.red[500]},
    ${COLORS.orange[500]},
    ${COLORS.yellow[700]},
    ${COLORS.green[500]},
    ${COLORS.blue[500]},
    ${COLORS.purple[500]},
    ${COLORS.pink[500]},
    ${COLORS.red[500]},
    ${COLORS.orange[500]},
    ${COLORS.yellow[700]},
    ${COLORS.green[500]},
    ${COLORS.blue[500]}
  );
  animation: ${gradientGo} 6s linear infinite;
`;

export default OldMethod;
