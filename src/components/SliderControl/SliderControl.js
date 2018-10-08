// @flow
import React, { Component, Children } from 'react';
import styled from 'styled-components';

import DemoControl from '../DemoControl';
import Slider from '../Slider';

type Props = {
  id: string,
  label: string,
  value: number,
  updateValue: (key: string, value: string | number) => void,
  children: React$Node,
};

const SliderControl = ({
  id,
  label,
  value,
  children,
  updateValue,
  ...delegated
}: Props) => {
  return (
    <DemoControl label={label}>
      <Slider
        orientation="horizontal"
        value={value}
        onChange={newValue => updateValue(id, newValue)}
        {...delegated}
      />
    </DemoControl>
  );
};

export default SliderControl;
