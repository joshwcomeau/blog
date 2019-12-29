// @flow
/**
 * Currently unused
 */
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { COLORS } from '../../constants';
import { range, sample, random } from '../../utils';

const COLOR_THEMES = {
  pink: { primary: COLORS.pink[500], secondary: COLORS.pink[700] },
  purple: { primary: COLORS.purple[500], secondary: COLORS.blue[700] },
  green: { primary: COLORS.green[500], secondary: COLORS.green[700] },
  // { primary: COLORS.yellow[500], secondary: COLORS.orange[500] },
  // { primary: COLORS.green[500], secondary: COLORS.lime[700] },
};

const COLUMN_WIDTH = 20;

type ShapeId = 'cross' | 'circle' | 'squiggle';

const generateDirectionShape = (id: ShapeId, { primary, secondary }) => {
  switch (id) {
    case 'cross':
      return (
        <g>
          <line
            x1={0}
            y1={0}
            x2={100}
            y2={100}
            strokeLinecap="round"
            strokeWidth={40}
            stroke={primary}
          />
          <line
            x1={100}
            y1={0}
            x2={0}
            y2={100}
            strokeLinecap="round"
            strokeWidth={40}
            stroke={secondary}
          />
        </g>
      );
    case 'circle':
      return (
        <ellipse
          rx={48}
          ry={48}
          cx={50}
          cy={50}
          fill="none"
          strokeWidth={30}
          stroke={primary}
        />
      );

    case 'squiggle':
      return (
        <path
          d={`
              M 0,0
              C 100,15 0,85 100,100
            `}
          fill="none"
          strokeWidth={40}
          strokeLinecap="round"
          stroke={primary}
        />
      );

    default:
      throw new Error('Unrecognized shape ID: ' + id);
  }
};

type Props = {
  color: string,
  decorationColor: string,
  children: React$Node,
};

type State = {
  decorations: Array<React$Element<*>>,
};

class Emphasis extends Component<Props, State> {
  state = {
    decorations: [],
  };

  node: ?HTMLElement;

  componentDidMount() {
    if (!this.node) {
      return;
    }

    const nodeRect = this.node.getBoundingClientRect();

    let fontSize = window
      .getComputedStyle(this.node)
      .getPropertyValue('font-size')
      .replace(/px$/, '');
    fontSize = Number(fontSize);

    const numOfDecorations = Math.floor(nodeRect.width / COLUMN_WIDTH);
    const decorations = range(0, numOfDecorations).map(i =>
      this.generateDecoration(i, nodeRect, fontSize)
    );

    this.setState({ decorations });
  }

  generateDecoration(index: number, parentRect: ClientRect, fontSize: number) {
    const { decorationColor } = this.props;

    const size = random(Math.round(fontSize * 0.2), Math.round(fontSize * 0.4));

    const left = Math.min(
      random(index * COLUMN_WIDTH, (index + 1) * COLUMN_WIDTH),
      parentRect.width
    );
    const top = sample([
      random(-2, 4),
      random(parentRect.height - 8, parentRect.height - 2),
    ]);
    const opacity = Math.random() / 2 + 0.5;

    const animationDuration = random(5000, 15000);
    const animationDelay = random(-animationDuration, 0);
    const animationDirection = sample(['normal', 'reverse']);

    const shapeId: ShapeId = sample(['cross', 'circle', 'squiggle']);
    const colors =
      COLOR_THEMES[decorationColor] || sample(Object.values(COLOR_THEMES));

    const animation = sample([
      `${circular} ${animationDuration}ms linear ${animationDelay}ms infinite ${animationDirection}`,
    ]);

    return (
      <DecorationSvg
        key={index}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          top,
          left,
          opacity,
          animation,
        }}
      >
        {generateDirectionShape(shapeId, colors)}
      </DecorationSvg>
    );
  }

  render() {
    const { color, children } = this.props;
    const { decorations } = this.state;

    return (
      <Wrapper ref={node => (this.node = node)}>
        <Content color={color}>{children}</Content>
        <Decorations>{decorations}</Decorations>
      </Wrapper>
    );
  }
}

const circular = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  font-weight: bold;
`;

const Content = styled.span`
  color: ${props => props.color};
  position: relative;
  z-index: 2;
`;

const DecorationSvg = styled.svg`
  position: absolute;
  overflow: visible;
`;

const Decorations = styled.span`
  display: inline-block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default Emphasis;
