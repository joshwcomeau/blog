import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Bezier from './Bezier';
import RadioGroup from '../../../components/RadioGroup';
import RadioButton from '../../../components/RadioButton';
import { COLORS } from '../../../constants';

class BezierController extends PureComponent {
  state = {
    viewBoxWidth: 1000,
    viewBoxHeight: 350,
    p1: [50, 325],
    p2: [100, 10],
    p3: [666, 340],
    p4: [975, 25],
    type: 'cubic',
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
  };

  swapType = type => {
    console.log('Swapping', type);
    this.setState({ type });
  };

  render() {
    const { viewBoxWidth, viewBoxHeight, p1, p2, p3, p4, type } = this.state;

    console.log(type);

    return (
      <div>
        <Wrapper>
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
          <BezierWrapper>
            <Bezier
              viewBoxWidth={viewBoxWidth}
              viewBoxHeight={viewBoxHeight}
              points={type === 'quadratic' ? [p1, p2, p4] : [p1, p2, p3, p4]}
              updatePoint={this.handleUpdatePoint}
            />
          </BezierWrapper>
        </Wrapper>
        <Note>The points on this Bézier curve are draggable!</Note>
      </div>
    );
  }
}

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 1px;

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

const Note = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioButtonsWrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  flex: 1;
  text-align: center;
`;

export default BezierController;
