// @flow
import React from 'react';

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
      <div style={{ flex: 1, paddingLeft: 7 }}>
        <Slider
          orientation="horizontal"
          value={value}
          onChange={newValue => updateValue(id, newValue)}
          {...delegated}
        />
      </div>
    </DemoControl>
  );
};

export default SliderControl;
