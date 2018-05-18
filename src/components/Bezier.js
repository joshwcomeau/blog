import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../constants';

class Bezier extends PureComponent {
  state = {
    draggingPointId: null,
  };

  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    viewBoxWidth: PropTypes.number,
    viewBoxHeight: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    updatePoint: PropTypes.func,
  };

  static defaultProps = {
    viewBoxWidth: 1000,
    viewBoxHeight: 250,
    strokeColor: COLORS.violet[500],
    strokeWidth: 6,
    grabbable: true,
  };

  handleMouseDown = pointId => () => {
    if (this.props.grabbable) {
      // TODO: Get distance from point center, so that clicking and dragging a
      // new point doesn't center it on the cursor.
      this.setState({ draggingPointId: pointId });
    }
  };

  handleMouseUp = () => {
    this.setState({ draggingPointId: null });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { viewBoxWidth, viewBoxHeight, updatePoint, grabbable } = this.props;
    const { draggingPointId } = this.state;

    if (!draggingPointId || !grabbable || !updatePoint) {
      return;
    }

    const svgBB = this.node.getBoundingClientRect();
    const positionRelativeToSvg = [clientX - svgBB.left, clientY - svgBB.top];

    const positionWithinViewBox = [
      positionRelativeToSvg[0] * viewBoxWidth / svgBB.width,
      positionRelativeToSvg[1] * viewBoxHeight / svgBB.height,
    ];

    updatePoint(draggingPointId, positionWithinViewBox);
  };

  render() {
    const {
      points,
      viewBoxWidth,
      viewBoxHeight,
      strokeColor,
      strokeWidth,
      grabbable,
    } = this.props;
    const [p1, p2, p3, p4] = points;

    const curveType = typeof p4 !== 'undefined' ? 'cubic' : 'quadratic';

    const instructions =
      curveType === 'cubic'
        ? `
            M ${p1[0]},${p1[1]}
            C ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}
          `
        : `
            M ${p1[0]},${p1[1]}
            Q ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}
          `;

    const lastPoint = curveType === 'cubic' ? p4 : p3;
    const lastPointId = curveType === 'cubic' ? 'p4' : 'p3';

    return (
      <Svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        innerRef={node => (this.node = node)}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <ControlLine x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />
        {curveType === 'quadratic' && (
          <ControlLine x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]} />
        )}
        {curveType === 'cubic' && (
          <ControlLine x1={p3[0]} y1={p3[1]} x2={p4[0]} y2={p4[1]} />
        )}

        <path
          d={instructions}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        <EndPoint
          cx={p1[0]}
          cy={p1[1]}
          onMouseDown={this.handleMouseDown('p1')}
          grabbable={grabbable}
        />

        <ControlPoint
          cx={p2[0]}
          cy={p2[1]}
          onMouseDown={this.handleMouseDown('p2')}
          grabbable={grabbable}
        />

        {curveType === 'cubic' && (
          <ControlPoint
            cx={p3[0]}
            cy={p3[1]}
            onMouseDown={this.handleMouseDown('p3')}
            grabbable={grabbable}
          />
        )}

        <EndPoint
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          onMouseDown={this.handleMouseDown(lastPointId)}
          grabbable={grabbable}
        />
      </Svg>
    );
  }
}

const ControlPoint = ({ cx, cy, onMouseDown, grabbable }) => (
  <g>
    <VisibleControlPoint cx={cx} cy={cy} rx={8} ry={8} grabbable={grabbable} />
    <InvisibleHandle
      cx={cx}
      cy={cy}
      rx={25}
      ry={25}
      grabbable={grabbable}
      onMouseDown={onMouseDown}
    />
  </g>
);

const Svg = styled.svg`
  position: relative;
  overflow: visible;
`;

const Point = styled.ellipse`
  cursor: ${props => (props.grabbable ? '-webkit-grab' : 'not-allowed')};

  &:active {
    cursor: ${props => (props.grabbable ? '-webkit-grabbing' : 'not-allowed')};
  }
`;

const EndPoint = styled(Point).attrs({
  rx: 15,
  ry: 15,
})`
  fill: ${props => (props.grabbable ? COLORS.pink[500] : COLORS.violet[500])};
`;

const VisibleControlPoint = styled(Point).attrs({
  rx: 8,
  ry: 8,
})`
  fill: white;
  stroke: ${props => (props.grabbable ? COLORS.pink[500] : COLORS.violet[500])};
  stroke-width: 3;
`;

const InvisibleHandle = styled(Point)`
  fill: transparent;
  stroke: transparent;
`;

const ControlLine = styled.line`
  stroke: ${COLORS.gray[300]};
  stroke-dasharray: 5, 5;
  stroke-width: 2;
`;

export default Bezier;
