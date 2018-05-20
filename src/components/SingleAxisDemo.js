import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import IconBase from 'react-icons-kit';
import { iosFlask } from 'react-icons-kit/ionicons/iosFlask';
import { iosFlaskOutline } from 'react-icons-kit/ionicons/iosFlaskOutline';

import { COLORS } from '../constants';
import { throttle } from '../utils';
import { interactWithExplorable } from '../helpers/analytics.helpers';

import Slider from './Slider';
import Spacer from './Spacer';

class SingleAxisDemo extends PureComponent {
  static propTypes = {
    // `id` is for Google Analytics
    id: PropTypes.string.isRequired,
    height: PropTypes.number,
    defaultAxisValue: PropTypes.number,
    sliderOrientation: PropTypes.oneOf(['vertical', 'horizontal']),
    showNote: PropTypes.bool,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    height: 200,
    defaultAxisValue: 0,
    sliderOrientation: 'vertical',
    showNote: false,
  };

  state = {
    axisValue: this.props.defaultAxisValue,
    isHovering: false,
  };

  updateSliderVal = val => {
    this.setState({ axisValue: val });
    this.track();
  };

  track = throttle(() => {
    interactWithExplorable({
      component: 'SingleAxisDemo',
      label: this.props.id,
    });
  }, 5000);

  handleMouseEnter = () => this.setState({ isHovering: true });
  handleMouseLeave = () => this.setState({ isHovering: false });

  render() {
    const { height, defaultAxisValue, showNote, children } = this.props;
    const { isHovering } = this.state;

    return (
      <Wrapper>
        <Motion style={{ axisValue: this.state.axisValue }}>
          {({ axisValue }) => (
            <Box
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <ChildWrapper>{children(axisValue)}</ChildWrapper>

              <Spacer size={30} />

              <SliderWrapper>
                <Slider
                  value={axisValue}
                  height={height}
                  onChange={this.updateSliderVal}
                />
              </SliderWrapper>
            </Box>
          )}
        </Motion>

        {showNote && (
          <InteractivityNotice>
            <IconWrapper isHovering={isHovering}>
              <IconBase
                size={32}
                icon={isHovering ? iosFlask : iosFlaskOutline}
              />
            </IconWrapper>
            This is an interactive demo! Feel free to poke around with it.
          </InteractivityNotice>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

const ChildWrapper = styled.div`
  flex: 1;
  padding: 30px;
`;

const Box = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(0, 0, 0, 0.18);
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  padding: 30px;
  background: rgba(0, 0, 0, 0.1);

  ${Box}:hover & {
    background: rgba(0, 0, 0, 0.18);
  }
`;

const InteractivityNotice = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  color: ${COLORS.pink[500]};
`;

export default SingleAxisDemo;
