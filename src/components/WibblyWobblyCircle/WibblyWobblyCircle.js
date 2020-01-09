import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import produce from 'immer';

import { getShouldReduceMotion } from '@utils';
import { COLORS } from '@constants';

import {
  getRandomizedPointCoordinates,
  calculateMovementEffectOnCousin,
} from './WibblyWobblyCircle.helpers';

const rotate = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(359deg) }
`;

const Svg = styled.svg`
  animation: ${rotate} 18s linear infinite;
  overflow: visible !important;
`;

const WibblyWobblyCircle = ({
  size = 400,
  color = COLORS.blue[500],
  intensity = 1,
  ...delegated
}) => {
  const shouldEnableAnimations = !getShouldReduceMotion();

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;

  // We have a ✨ magic number ✨ used to allow bezier curves to approximate
  // circles. Roughly equal to 0.55228. Larger numbers make it square-ish,
  // smaller numbers make it diamond-ish.
  const k = (4 / 3) * (Math.sqrt(2) - 1);
  const kr = k * radius;

  const initialPoints = [
    // First curve:
    { x: cx, y: 0 },
    { x: cx + kr, y: 0 },
    { x: size, y: cy - kr },
    { x: size, y: cy },
    // subsequent curve
    { x: size, y: cy + kr },
    { x: cx + kr, y: size },
    { x: cx, y: size },
    // subsequent curve
    { x: cx - kr, y: size },
    { x: 0, y: cy + kr },
    { x: 0, y: cy },
    // final curve control point
    { x: 0, y: cy - kr },
    { x: cx - kr, y: 0 },
  ];

  const [points, setPoints] = React.useState(initialPoints);

  React.useEffect(() => {
    console.log('pop');
    let animateTimeoutId = null;

    if (!shouldEnableAnimations) {
      return;
    }

    const pointIndexToMove = Math.floor(Math.random() * initialPoints.length);

    const nextPoints = produce(points, draftPoints => {
      // Start by moving the selected point by a random amount.
      const { x, y } = getRandomizedPointCoordinates(
        pointIndexToMove,
        initialPoints[pointIndexToMove],
        size,
        intensity
      );

      draftPoints[pointIndexToMove].x = x;
      draftPoints[pointIndexToMove].y = y;

      // For our individual curves to behave naturally, though, we also need
      // to tweak the "cousin" point on the opposite curve.
      // More info: https://pomax.github.io/bezierinfo/#polybezier

      const {
        cousinIndex,
        x: cousinX,
        y: cousinY,
      } = calculateMovementEffectOnCousin(draftPoints, pointIndexToMove);

      if (typeof cousinIndex === 'number') {
        draftPoints[cousinIndex].x = cousinX;
        draftPoints[cousinIndex].y = cousinY;
      }
    });

    animateTimeoutId = window.setTimeout(
      () => setPoints(nextPoints),
      Math.random() * 200 * (intensity + 1)
    );

    return () => window.clearTimeout(animateTimeoutId);
  }, [size, points, intensity]);

  // React-spring can operate on an array of numbers, but it can't operate on
  // an array of x/y objects. "flatten" the data to a single array, so that each
  // value can be interpolated.
  const pointsArray = points.reduce(
    (acc, point) => [...acc, point.x, point.y],
    []
  );

  const sp = useSpring({
    pointsArray,
    config: { tension: 7, friction: 2 },
  });

  return (
    <Svg width={size} height={size} {...delegated}>
      <animated.path
        fill={color}
        d={sp.pointsArray.interpolate(
          (...p) => `
            M ${p[0]} ${p[1]}
            C ${p[2]} ${p[3]}, ${p[4]} ${p[5]}, ${p[6]} ${p[7]}
            C ${p[8]} ${p[9]}, ${p[10]} ${p[11]}, ${p[12]} ${p[13]}
            C ${p[14]} ${p[15]}, ${p[16]} ${p[17]}, ${p[18]} ${p[19]}
            C ${p[20]} ${p[21]}, ${p[22]} ${p[23]}, ${p[0]} ${p[1]}
          `
        )}
      />
    </Svg>
  );
};

export default WibblyWobblyCircle;
