import React from 'react';
import styled from 'styled-components';

import { range } from '@utils';

type Props = {
  width: number,
  height: number,
  squiggleWidth: number,
  phase: number,
};

const SquigglyLine = ({
  width,
  height,
  squiggleWidth,
  phase,
  ...delegated
}: Props) => {
  const numOfSquiggles = Math.round(width / squiggleWidth);
  const roundedSquiggleWidth = width / numOfSquiggles;

  const linePositionY = height / 2;

  const initialPoint = { x: 0, y: linePositionY };

  const instructions = range(0, numOfSquiggles - 1).reduce((acc, i) => {
    const sideMultiplier = i % 2 === 0 ? 1 : -1;

    const lastPointX = i * roundedSquiggleWidth;

    const controlPointX = lastPointX + roundedSquiggleWidth / 2;
    const controlPointY =
      linePositionY + roundedSquiggleWidth / 2 * sideMultiplier;

    const x = lastPointX + roundedSquiggleWidth;
    const y = linePositionY;

    const instruction = `Q ${controlPointX},${controlPointY} ${x},${y}`;

    return `${acc} ${instruction}`;
  }, `M ${initialPoint.x},${initialPoint.y}`);

  return (
    <Svg width={numOfSquiggles * roundedSquiggleWidth} height={height}>
      <path d={instructions} fill="none" strokeLinecap="round" {...delegated} />
    </Svg>
  );
};

SquigglyLine.defaultProps = {
  squiggleWidth: 5,
  phase: 1,
};

const Svg = styled.svg`
  display: block;
  overflow: visible;
`;

export default SquigglyLine;
