import React from 'react';

const RadioButton = ({ name, id, isSelected, handleSelect }) =>
  console.log(name, id, isSelected) || (
    <input
      type="radio"
      name={name}
      id={id}
      checked={isSelected}
      onChange={() => handleSelect(id)}
    />
  );

export default RadioButton;
