import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { sample } from '../../utils';

const rainbowColors = [
  COLORS.red[500],
  COLORS.orange[500],
  COLORS.green[500],
  COLORS.blue[500],
  COLORS.indigo[500],
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

    let currentCycleIndex = 0;
    let timeoutId;

    const updateColors = () => {
      currentCycleIndex++;

      const c1 = rainbowColors[currentCycleIndex % rainbowColors.length]
      const c2 = rainbowColors[(currentCycleIndex + 1) % rainbowColors.length]
      const c3 = rainbowColors[(currentCycleIndex + 2) % rainbowColors.length]

      buttonRef.current.style.setProperty(firstColorId, c1)
      buttonRef.current.style.setProperty(secondColorId, c2)
      buttonRef.current.style.setProperty(thirdColorId, c3)

      timeoutId = window.setTimeout(updateColors, 2000);
    }

    updateColors();

    // let timeoutId = window.setTimeout(updateColors, 1000)

    // let timeoutIds = {};


    // const scheduleColorUpdate = (property) => {
    //   if (!buttonRef.current || !buttonRef.current.style) {
    //     return;
    //   }

    //   const newColor = rainbowColors[currentCycleIndex];
    //   buttonRef.current.style.setProperty(property, newColor)

    //   timeoutIds[property] = window.setTimeout(() => scheduleColorUpdate(property), 1000)

    //   currentCycleIndex = (currentCycleIndex + 1) % rainbowColors.length

    // }

    // timeoutIds[firstColorId] = window.setTimeout(() => scheduleColorUpdate(firstColorId), 333)
    // timeoutIds[secondColorId] = window.setTimeout(() => scheduleColorUpdate(secondColorId), 666)
    // timeoutIds[thirdColorId] = window.setTimeout(() => scheduleColorUpdate(thirdColorId), 1000)

    return () => {
      window.clearTimeout(timeoutId)
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
    ${getVarName(0)} 2000ms linear,
    ${getVarName(1)} 2000ms linear,
    ${getVarName(2)} 2000ms linear;
  background: linear-gradient(
    -8deg,
    var(${getVarName(0)}),
    var(${getVarName(1)})
  );
`;


export default MagicRainbowButton;
