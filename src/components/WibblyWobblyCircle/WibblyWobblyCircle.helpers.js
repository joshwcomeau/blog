export const randomizeWithinThreshold = (n, threshold) => {
  /** Tweak a given number by a random amount within a +/- threshold.
   * @example: randomizeWithinThreshold(10, 5)
   *    - Produces a random value between 5 and 15
   * @example: randomizeWithinThreshold(5, 1)
   *    - Produces a random value between 4.0 and 6.0
   */
  return n + Math.random() * threshold - threshold / 2;
};

export const getRandomizedPointCoordinates = (
  pointIndex,
  originalPoint,
  size,
  intensity = 1
) => {
  /**
   * Get a new X/Y coordinate for a given point index.
   * The returned coordinate will be randomized, but within a certain
   * threshold of the point's original position.
   */
  // use the _original_ data, rather than the current data in this.state,
  // to ensure that our shape never distorts too much over time.
  // const originalPoint = this.initialPoints[pointIndex]

  // Our "anchor" points can look jagged if we move them too far from their
  // original position. We still want to move 'em a bit, to keep the shape
  // looking dynamic, but we'll vary it by a smaller amount.
  const isFixedPoint = pointIndex % 3 === 0;
  let variableAmount = isFixedPoint ? size * 0.02 : size * 0.075;

  // Consumers can make it warble more/less with the `warbleStrength` prop.
  variableAmount *= intensity;

  return {
    x: randomizeWithinThreshold(originalPoint.x, variableAmount),
    y: randomizeWithinThreshold(originalPoint.y, variableAmount),
  };
};

export const calculateMovementEffectOnCousin = (points, movingPointIndex) => {
  const movingPoint = points[movingPointIndex];

  // Fixed points, at the cardinal tips, don't have any cousins;
  // they can move freely.
  if (movingPointIndex % 3 === 0) {
    return {};
  }

  let fixedIndex;
  let cousinIndex;
  if (movingPointIndex % 3 === 1) {
    // For the first point in a curve, the cousin will be the second point
    // on the previous curve.
    fixedIndex = movingPointIndex - 1;
    fixedIndex += fixedIndex < 0 ? points.length : 0;
    cousinIndex = movingPointIndex - 2;
    cousinIndex += cousinIndex < 0 ? points.length : 0;
  } else {
    // For the second point in a curve, the cousin will be the first point
    // on the next curve.
    fixedIndex = (movingPointIndex + 1) % points.length;
    cousinIndex = (movingPointIndex + 2) % points.length;
  }

  const fixed = points[fixedIndex];
  const cousin = points[cousinIndex];

  // Trigonometry stuff that I got from a fantastic bezier guide:
  // https://pomax.github.io/bezierinfo/#polybezier
  //
  // TL:DR; we don't simply want to move cousin points 1:1 with the moving
  // point. We want to make them follow the same angle, but we no longer care
  // about vector length.
  const a = Math.atan2(fixed.y - movingPoint.y, fixed.x - movingPoint.x);
  const dx = cousin.x - fixed.x;
  const dy = cousin.y - fixed.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  const x = fixed.x + d * Math.cos(a);
  const y = fixed.y + d * Math.sin(a);

  return { cousinIndex, x, y };
};
