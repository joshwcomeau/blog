import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { sample } from '../../utils';

const rainbowColors = [
  COLORS.red[500],
  COLORS.orange[500],
  COLORS.yellow[700],
  COLORS.green[500],
  COLORS.blue[500],
  COLORS.purple[500],
  COLORS.pink[500],
]

const getVarName = (index) => `--magic-rainbow-color-${index}`;

const MagicRainbowButton = ({ children, ...delegated }) => {
  const firstColorId = getVarName(0)
  const secondColorId = getVarName(1)
  const thirdColorId = getVarName(2)

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    try {
      CSS.registerProperty({
        name: firstColorId,
        syntax: '<color>',
        inherits: false,
        initialValue: COLORS.red[500],
      })
      CSS.registerProperty({
        name: secondColorId,
        syntax: '<color>',
        inherits: false,
        initialValue: COLORS.yellow[700]
      })
      CSS.registerProperty({
        name: thirdColorId,
        syntax: '<color>',
        inherits: false,
        initialValue: COLORS.pink[500]
      })
    } catch (err) {
      console.log('caught', err)
      if (err.toString().match('The name provided has already been registered.')) {
        // This is fine. Just means that there are multiple instances of
        // this component, and we don't need to re-register these properties.
      } else {
        throw new Error(err);
      }



    }

    let timeoutIds = {};

    const scheduleColorUpdate = (property) => {
      if (!buttonRef.current || !buttonRef.current.style) {
        return;
      }

      const newColor = sample(rainbowColors);
      buttonRef.current.style.setProperty(property, newColor)

      timeoutIds[property] = window.setTimeout(() => scheduleColorUpdate(property), Math.random() * 2000)

    }

    timeoutIds[firstColorId] = window.setTimeout(() => scheduleColorUpdate(firstColorId), Math.random() * 2000)
    timeoutIds[secondColorId] = window.setTimeout(() => scheduleColorUpdate(secondColorId), Math.random() * 2000)
    timeoutIds[thirdColorId] = window.setTimeout(() => scheduleColorUpdate(thirdColorId), Math.random() * 2000)

    return () => {
      window.clearTimeout(timeoutIds[firstColorId])
      window.clearTimeout(timeoutIds[secondColorId])
      window.clearTimeout(timeoutIds[thirdColorId])
    }
  }, []);


  return (
    <ButtonElem innerRef={buttonRef} {...delegated}>
      {children}
    </ButtonElem>

  );
};

const ButtonElem = styled.button`
  ${getVarName(0)}: ${rainbowColors[0]};
  position: relative;
  border: none;
  color: white;
  transition:
    ${getVarName(0)} 1500ms,
    ${getVarName(1)} 1500ms,
    ${getVarName(2)} 1500ms
    ;
  background: linear-gradient(
    -8deg,
    var(${getVarName(0)}),
    var(${getVarName(1)}),
    var(${getVarName(2)})
  );
`;


export default MagicRainbowButton;
