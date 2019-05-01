import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { COLORS } from '@constants';
import { throttle } from '@utils';
import { interactWithExplorable } from '../../helpers/analytics.helpers';

import Bezier from '../Bezier';
import RadioButton from '../RadioButton';

class BezierController extends PureComponent {
  static propTypes = {
    // `id` is used in Google Analytics tracking.
    // Plz use something unique.
    id: PropTypes.string.isRequired,
    initialType: PropTypes.oneOf(['quadratic', 'cubic']),
    allowToggle: PropTypes.bool,
    p1: PropTypes.arrayOf(PropTypes.number),
    p2: PropTypes.arrayOf(PropTypes.number),
    p3: PropTypes.arrayOf(PropTypes.number),
    p4: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    initialType: 'quadratic',
    allowToggle: false,
  };

  state = {
    viewBoxWidth: 1000,
    viewBoxHeight: 400,
    p1: this.props.p1 || [25, 200],
    p2: this.props.p2 || [500, 200],
    p3: this.props.p3 || [800, 200],
    p4: this.props.p4 || [975, 200],
    type: this.props.initialType,
    allowToggle: false,
  };

  handleUpdatePoint = (pointId, pointCoords) => {
    // HACK: Quadratic curves take P1, P2, and P4 (not P3).
    // This is to make transitioning between the two feel more natural.
    // Sadly, this means we have to patch that association when the quadratic
    // p4 moves.
    if (this.state.type === 'quadratic' && pointId === 'p3') {
      pointId = 'p4';
    }

    this.setState({ [pointId]: pointCoords });

    this.track();
  };

  swapType = type => {
    this.setState({ type });
    this.track();
  };

  track = throttle(() => {
    interactWithExplorable({
      component: 'Bezier',
      label: this.props.id,
    });
  }, 5000);

  render() {
    const { allowToggle } = this.props;
    const { viewBoxWidth, viewBoxHeight, p1, p2, p3, p4, type } = this.state;

    return (
      <div>
        <Wrapper>
          {allowToggle && (
            <Controls>
              <RadioButtonsWrapper>
                <Label>
                  <RadioButton
                    name="bezier-control-type"
                    id="quadratic"
                    isSelected={type === 'quadratic'}
                    handleSelect={this.swapType}
                  />
                  Quadratic
                </Label>

                <Label>
                  <RadioButton
                    name="bezier-control-type"
                    id="cubic"
                    isSelected={type === 'cubic'}
                    handleSelect={this.swapType}
                  />
                  Cubic
                </Label>
              </RadioButtonsWrapper>
            </Controls>
          )}
          <BezierWrapper>
            <Bezier
              viewBoxWidth={viewBoxWidth}
              viewBoxHeight={viewBoxHeight}
              points={type === 'quadratic' ? [p1, p2, p4] : [p1, p2, p3, p4]}
              updatePoint={this.handleUpdatePoint}
            />
          </BezierWrapper>
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 1px;
  margin-bottom: 40px;

  &:hover {
    background: rgba(0, 0, 0, 0.18);
  }
`;

const Controls = styled.div`
  padding: 20px;
`;

const BezierWrapper = styled.div`
  background: ${COLORS.white};
`;

const RadioButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const Label = styled.label`
  flex: 1;
  text-align: center;
`;

export default BezierController;
