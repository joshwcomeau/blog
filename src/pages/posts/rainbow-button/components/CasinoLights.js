import React from 'react';
import styled from 'styled-components';

import { normalize, range } from '@utils';
import useInterval from '@hooks/use-interval.hook';

import Demo from '@components/Demo';
import SliderControl from '@components/SliderControl';

const DemoWrapper = () => {
  const MIN_SPEED = 1;
  const MAX_SPEED = 5;
  return (
    <Demo
      id="old-rainbow-method"
      initialValues={{ speed: 3 }}
      style={{ background: '#333' }}
      controls={(values, updateValue) => {
        return (
          <SliderControl
            id="speed"
            label="Speed"
            min={MIN_SPEED}
            max={MAX_SPEED}
            step={0.5}
            value={values.speed}
            updateValue={updateValue}
          />
        );
      }}
    >
      {({ speed }) => {
        const delay = normalize(speed, MIN_SPEED, MAX_SPEED, 300, 60);

        return <CasinoLights delay={delay} />;
      }}
    </Demo>
  );
};

const CasinoLights = ({ delay }) => {
  const TOTAL_NUM_OF_LIGHTS = 7;
  const [activeLight, setActiveLight] = React.useState(0);

  useInterval(() => {
    setActiveLight((activeLight + 1) % TOTAL_NUM_OF_LIGHTS);
  }, delay);

  return (
    <>
      {range(0, TOTAL_NUM_OF_LIGHTS - 1).map(i => (
        <LightSocket key={i}>
          <Light
            status={activeLight === i ? 'on' : 'off'}
            style={{ transition: `opacity ${delay * 0.9}ms` }}
          />
        </LightSocket>
      ))}
    </>
  );
};

const LightSocket = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 10px;
  background: hsl(0deg, 0%, 10%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Light = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(
    circle at top,
    hsl(55deg, 100%, 100%),
    hsl(55deg, 100%, 70%)
  );
  opacity: ${p => (p.status === 'on' ? 1 : 0)};
  border: 3px solid hsl(0deg, 0%, 10%);
  box-shadow: 0px 4px 10px hsla(55deg, 100%, 90%, 0.2);
`;

export default DemoWrapper;
