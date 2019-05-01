/**
 * Ahh, so I'm rushing to finish this ahead of my React Europe talk.
 * This is very shitty, and could be wayyyy better.
 * You will not find inspirational graph things here.
 */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '@constants';
import { range } from '@utils';

const BezierInterpolationGraph = () => (
  <Svg viewBox="0 0 440 440">
    {range(1, 22).map(i => (
      <line
        key={i}
        x1={i * 20}
        y1={0}
        x2={i * 20}
        y2={440}
        stroke={COLORS.gray[200]}
        strokeWidth={1}
      />
    ))}

    {range(1, 22).map(i => (
      <line
        key={i}
        x1={0}
        y1={i * 20}
        x2={440}
        y2={i * 20}
        stroke={COLORS.gray[200]}
        strokeWidth={1}
      />
    ))}

    <line
      x1={220}
      y1={120}
      x2={320}
      y2={120}
      stroke={COLORS.gray[300]}
      strokeWidth={2}
      strokeDasharray={5}
      strokeLinecap="round"
    />

    <line
      x1={320}
      y1={120}
      x2={320}
      y2={220}
      stroke={COLORS.gray[300]}
      strokeWidth={2}
      strokeDasharray={5}
      strokeLinecap="round"
    />

    <line
      x1={0}
      y1={220}
      x2={440}
      y2={220}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <line
      x1={220}
      y1={0}
      x2={220}
      y2={440}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <line
      x1={220}
      y1={20}
      x2={210}
      y2={20}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <text textAnchor="end" x={200} y={20} dy={5}>
      200
    </text>

    <line
      x1={220}
      y1={120}
      x2={210}
      y2={120}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <text textAnchor="end" x={200} y={120} dy={5}>
      100
    </text>

    <line
      x1={320}
      y1={220}
      x2={320}
      y2={230}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <text textAnchor="middle" x={320} y={240} dy={8}>
      0.5
    </text>

    <line
      x1={420}
      y1={220}
      x2={420}
      y2={230}
      stroke={COLORS.gray[800]}
      strokeWidth={3}
      strokeLinecap="round"
    />

    <text textAnchor="middle" x={420} y={240} dy={8}>
      1.0
    </text>

    <line
      x1={220}
      y1={20}
      x2={420}
      y2={220}
      stroke={COLORS.pink[500]}
      strokeWidth={4}
      strokeLinecap="round"
    />
  </Svg>
);

const Svg = styled.svg`
  overflow: visible;
  display: block;
  margin: 48px auto;
  max-width: 400px;
`;

export default BezierInterpolationGraph;
