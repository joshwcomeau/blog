// @flow
import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import RcSlider, { createSliderWithTooltip } from 'rc-slider';

import { COLORS } from '@constants';

type Props = {
  label?: string,
  min?: number,
  max?: number,
  step?: number,
  value?: number,
  defaultValue?: number,
  orientation: 'vertical' | 'horizontal',
  withTooltip: boolean,
  onChange: (val: number) => void,
};

const RcSliderWithTooltip = createSliderWithTooltip(RcSlider);

const IS_MOBILE =
  typeof window === 'undefined' ? false : window.innerWidth < 450;

const SLIDER_WIDTH = IS_MOBILE ? 28 : 16;
const SLIDER_BAR_WIDTH = 2;

const styles = {
  vertical: {
    style: {
      position: 'relative',
      height: '100%',
      width: SLIDER_WIDTH,
      paddingLeft: SLIDER_WIDTH / 2,
    },
    trackStyle: {
      position: 'absolute',
      width: SLIDER_BAR_WIDTH,
      background: 'rgba(0, 0, 0, 0.7)',
    },
    railStyle: {
      position: 'absolute',
      width: SLIDER_BAR_WIDTH,
      height: '100%',
      background: 'rgba(0, 0, 0, 0.15)',
    },
    handleStyle: [
      {
        position: 'absolute',
        left: SLIDER_WIDTH / 2 + SLIDER_BAR_WIDTH / 2,
        background: COLORS.blue[500],
        width: SLIDER_WIDTH,
        height: SLIDER_WIDTH,
        transform: 'translate(-50%, 50%)',
        borderRadius: '50%',
        cursor: 'grab',
        touchAction: 'pan-x',
      },
    ],
  },
  horizontal: {
    style: {
      position: 'relative',
      width: '100%',
      height: SLIDER_WIDTH,
      paddingTop: SLIDER_WIDTH / 2,
    },
    trackStyle: {
      position: 'absolute',
      height: SLIDER_BAR_WIDTH,
      background: 'rgba(0, 0, 0, 0.7)',
    },
    railStyle: {
      position: 'absolute',
      width: '100%',
      height: SLIDER_BAR_WIDTH,
      background: 'rgba(0, 0, 0, 0.15)',
    },
    handleStyle: [
      {
        position: 'absolute',
        top: SLIDER_WIDTH / 2 + SLIDER_BAR_WIDTH / 2,
        background: COLORS.blue[500],
        width: SLIDER_WIDTH,
        height: SLIDER_WIDTH,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        cursor: 'grab',
        touchAction: 'pan-x',
      },
    ],
  },
};

class Slider extends Component<Props> {
  static defaultProps = {
    orientation: 'vertical',
  };

  render() {
    const { label, orientation, withTooltip, ...delegatedProps } = this.props;

    const SliderComponent = withTooltip ? RcSliderWithTooltip : RcSlider;

    return (
      <Fragment>
        {label && <Label>{label}</Label>}

        <SliderComponent
          vertical={orientation === 'vertical'}
          {...delegatedProps}
          {...styles[orientation]}
        />

        <SliderStyles />
      </Fragment>
    );
  }
}

// HACK: RC Slider uses specific class names for styling, so we'll just use
// those.
// TODO: Use the `xStyle` overrides so that we can support vertical and
// horizontal

const SliderStyles = createGlobalStyle`
  .rc-slider {
  }

  .rc-slider .rc-slider-handle:active {
    cursor: grabbing !important;
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
