// @flow
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import RcSlider, { createSliderWithTooltip } from 'rc-slider';

import { COLORS, IS_MOBILE_USER_AGENT } from '../constants';

type Props = {
  label: string,
  min?: number,
  max?: number,
  step?: number,
  value?: number,
  defaultValue?: number,
  orientation: 'vertical' | 'horizontal',
  onChange: (val: number) => void,
};

const RcSliderWithTooltip = createSliderWithTooltip(RcSlider);

class Slider extends Component<Props> {
  render() {
    const { label, ...delegatedProps } = this.props;

    return (
      <div>
        {label && <Label>{label}</Label>}

        <RcSliderWithTooltip
          vertical
          {...delegatedProps}
          tipProps={{ placement: 'bottom' }}
        />
      </div>
    );
  }
}

// HACK: RC Slider uses specific class names for styling, so we'll just use
// those.
// TODO: Use the `xStyle` overrides so that we can support vertical and
// horizontal
const SLIDER_WIDTH = IS_MOBILE_USER_AGENT ? 28 : 16;
const SLIDER_BAR_WIDTH = 2;

injectGlobal`
  .rc-slider {
    position: relative;
    height: 100%;
    width: ${SLIDER_WIDTH + 'px'};
    padding-left: ${SLIDER_WIDTH / 2 + 'px'};
  }

  .rc-slider .rc-slider-rail, .rc-slider .rc-slider-track {
    position: absolute;
    width: ${SLIDER_BAR_WIDTH + 'px'};
  }

  .rc-slider .rc-slider-rail {
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
  }

  .rc-slider .rc-slider-track {
    background: rgba(0, 0, 0, 0.7);
  }

  .rc-slider .rc-slider-handle {
    position: absolute;
    left: ${SLIDER_WIDTH / 2 + SLIDER_BAR_WIDTH / 2 + 'px'};
    background: ${COLORS.blue[500]};
    width: ${SLIDER_WIDTH + 'px'};
    height: ${SLIDER_WIDTH + 'px'};
    transform: translate(-50%, 50%);
    border-radius: 50%;
    cursor: grab;
    touch-action: pan-x;
  }

  .rc-slider .rc-slider-handle:active {
    cursor: grabbing;
  }

  .rc-slider-tooltip {
    position: absolute;
    opacity: 1;
    will-change: opacity;
    transition: opacity 500ms;
    border-radius: 2px;
  }
  .rc-slider-tooltip-hidden {
    opacity: 0;
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: ${SLIDER_WIDTH * 0.75 + 'px'};
`;

export default Slider;
