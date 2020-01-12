/**
 * HACK: oh god the hacks. Did this ASAP, shouldn't be trusted.
 */
import React from 'react';
import styled from 'styled-components';

import Bezier from '@components/Bezier';
import Box from '@components/Box';

const CircleBezier = ({ size = 400 }) => {
  const svgRef = React.useRef(null);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;

  // We have a ✨ magic number ✨ used to allow bezier curves to approximate
  // circles. Roughly equal to 0.55228. Larger numbers make it square-ish,
  // smaller numbers make it diamond-ish.
  const k = (4 / 3) * (Math.sqrt(2) - 1);
  const kr = k * radius;

  const [points, setPoints] = React.useState([
    // First curve:
    [cx, 0],
    [cx + kr, 0],
    [size, cy - kr],
    [size, cy],
    // subsequent curve
    [size, cy + kr],
    [cx + kr, size],
    [cx, size],
    // subsequent curve
    [cx - kr, size],
    [0, cy + kr],
    [0, cy],
    // final curve control point
    [0, cy - kr],
    [cx - kr, 0],
  ]);

  const [draggingPointIndex, setDraggingPointIndex] = React.useState(null);

  const handleDrag = ev => {
    // This event handles both mouseMove and touchMove.
    let x, y;
    if (ev.touches) {
      ev.preventDefault();
      const touch = ev.touches[0];
      [x, y] = [touch.clientX, touch.clientY];
    } else {
      [x, y] = [ev.clientX, ev.clientY];
    }

    if (draggingPointIndex == null) {
      return;
    }

    const svgBB = svgRef.current.getBoundingClientRect();
    const positionRelativeToSvg = [x - svgBB.left, y - svgBB.top];

    const positionWithinViewBox = [
      (positionRelativeToSvg[0] * size) / svgBB.width,
      (positionRelativeToSvg[1] * size) / svgBB.height,
    ];

    const pointsClone = [...points];
    pointsClone[draggingPointIndex] = positionWithinViewBox;

    setPoints(pointsClone);
  };

  const handleRelease = () => {
    setDraggingPointIndex(null);
  };

  return (
    <Box>
      <Svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: size, height: size }}
        onMouseMove={handleDrag}
        onTouchMove={handleDrag}
        onMouseUp={handleRelease}
        onTouchEnd={handleRelease}
      >
        <Bezier
          embeddedInParentSvg
          svgRef={svgRef.current}
          points={points.slice(0, 4)}
          viewBoxWidth={size}
          viewBoxHeight={size}
          selectP1={() => setDraggingPointIndex(0)}
          selectP2={() => setDraggingPointIndex(1)}
          selectP3={() => setDraggingPointIndex(2)}
          selectP4={() => setDraggingPointIndex(3)}
        />
        <Bezier
          embeddedInParentSvg
          svgRef={svgRef.current}
          points={points.slice(3, 7)}
          viewBoxWidth={size}
          viewBoxHeight={size}
          selectP1={() => setDraggingPointIndex(3)}
          selectP2={() => setDraggingPointIndex(4)}
          selectP3={() => setDraggingPointIndex(5)}
          selectP4={() => setDraggingPointIndex(6)}
        />
        <Bezier
          embeddedInParentSvg
          svgRef={svgRef.current}
          points={points.slice(6, 10)}
          viewBoxWidth={size}
          viewBoxHeight={size}
          selectP1={() => setDraggingPointIndex(6)}
          selectP2={() => setDraggingPointIndex(7)}
          selectP3={() => setDraggingPointIndex(8)}
          selectP4={() => setDraggingPointIndex(9)}
        />
        <Bezier
          embeddedInParentSvg
          svgRef={svgRef.current}
          points={[...points.slice(9), points[0]]}
          viewBoxWidth={size}
          viewBoxHeight={size}
          selectP1={() => setDraggingPointIndex(9)}
          selectP2={() => setDraggingPointIndex(10)}
          selectP3={() => setDraggingPointIndex(11)}
          selectP4={() => setDraggingPointIndex(0)}
        />
      </Svg>
    </Box>
  );
};

const Svg = styled.svg`
  position: relative;
  overflow: visible;
  touch-action: none;
  display: block;
`;

export default CircleBezier;
