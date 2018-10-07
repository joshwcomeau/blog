// @flow
import React, { Component, Children } from 'react';
import styled from 'styled-components';

import { COLORS } from 'constants';

import Choice from './Choice';

type Props = {
  id: string,
  label: string,
  selectedChoiceId: string,
  updateValue: (key: string, value: string | number) => void,
  children: React$Node,
};

class MultipleChoiceControl extends Component<Props> {
  render() {
    const { id, label, selectedChoiceId, children, updateValue } = this.props;

    const clonedChildren = Children.toArray(this.props.children).map(child =>
      React.cloneElement(child, {
        parentId: id,
        isSelected: selectedChoiceId === child.props.id,
        handleSelect: () => updateValue(id, child.props.id),
      })
    );

    return (
      <Wrapper>
        <Label>{label}</Label>
        <ChildWrapper>{clonedChildren}</ChildWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 30%;
`;

const ChildWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export default MultipleChoiceControl;
