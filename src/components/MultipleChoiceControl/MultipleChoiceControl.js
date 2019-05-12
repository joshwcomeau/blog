// @flow
import React, { Children } from 'react';

import DemoControl from '../DemoControl';

type Props = {
  id: string,
  label: string,
  value: string,
  updateValue: (key: string, value: string | number) => void,
  children: React$Node,
};

const MultipleChoiceControl = ({
  id,
  label,
  value,
  updateValue,
  children,
}: Props) => {
  const clonedChildren = Children.toArray(children).map(child =>
    React.cloneElement(child, {
      parentId: id,
      isSelected: value === child.props.id,
      handleSelect: () => updateValue(id, child.props.id),
    })
  );

  return <DemoControl label={label}>{clonedChildren}</DemoControl>;
};

export default MultipleChoiceControl;
