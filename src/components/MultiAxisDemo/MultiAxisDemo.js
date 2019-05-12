// @flow
// TODO: Update this to use `Demo`
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '@constants';
import { throttle } from '@utils';
import { interactWithExplorable } from '@helpers/analytics.helpers';

import Slider from '../Slider';
import Spacer from '../Spacer';

type Value = {
  id: string,
  label: string,
  value: number,
};

type Props = {
  // `id` is for Google Analytics
  id: string,

  children: values,
};

class SingleAxisDemo extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    height: PropTypes.number,
    defaultValue: PropTypes.number,
    showNote: PropTypes.bool,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    height: 200,
    defaultValue: 0,
    showNote: false,
  };

  state = {
    axisValue: this.props.defaultValue,
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
    const { id, height, showNote, children, ...delegated } = this.props;
    const { isHovering, axisValue } = this.state;

    return (
      <Wrapper>
        <Box
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <ChildWrapper>{children(axisValue)}</ChildWrapper>

          <Spacer size={30} />

          <SliderWrapper>
            <Slider
              {...delegated}
              value={axisValue}
              height={height}
              onChange={this.updateSliderVal}
            />
          </SliderWrapper>
        </Box>

        {showNote && (
          <InteractivityNotice>
            <IconWrapper isHovering={isHovering}>
              <IconBase size={32} icon={iosFlask} />
            </IconWrapper>
            This is an interactive demo! Try dragging the slider on the right.
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
  text-align: center;
`;

const Box = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:hover {
    border-color: rgba(0, 0, 0, 0.18);
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  padding: 30px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0 4px 4px 0;

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
