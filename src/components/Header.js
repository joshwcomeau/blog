import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';

import { COLORS, Z_INDICES } from '../constants';
import { humanizeDate } from '../helpers/date.helpers';
import { clamp } from '../utils';

const HEIGHT = 50;

class Header extends PureComponent {
  state = {
    translateAmount: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.scrollPosition = window.scrollY;
    this.lockedScrollPosition = null;
    this.scrollDirection = 'down';
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const newScrollPosition = window.scrollY;

    const newScrollDirection =
      newScrollPosition > this.scrollPosition ? 'down' : 'up';

    if (this.scrollDirection === 'down' && newScrollDirection === 'up') {
      // We don't want to allow the locked position to be changed if we're
      // in the middle of showing/hiding the header; this causes an odd glitchy
      // effect.
      const isMidReveal = this.state.translateAmount !== 0;

      if (!isMidReveal) {
        this.lockedScrollPosition = this.scrollPosition;
      }
    } else if (this.scrollDirection === 'up' && newScrollDirection === 'down') {
      const isMidReveal = this.state.translateAmount !== HEIGHT;

      if (!isMidReveal) {
        this.lockedScrollPosition = this.scrollPosition + HEIGHT;
      }
    }

    const translateAmount = clamp(
      this.lockedScrollPosition - newScrollPosition,
      0,
      HEIGHT
    );

    this.setState({ translateAmount });

    this.scrollDirection = newScrollDirection;
    this.scrollPosition = newScrollPosition;
  };

  render() {
    const { title, publishedOn, heroStyle } = this.props;
    const { translateAmount } = this.state;

    // TODO: color should depend on heroStyle.
    // Also, `heroStyle` should be renamed.
    const color = COLORS.pink[300];

    return (
      <Wrapper style={{ transform: `translateY(${translateAmount}px)` }}>
        <span>
          <Title color={color}>{title}</Title>
          <Date>{humanizeDate(publishedOn)}</Date>
        </span>
      </Wrapper>
    );
  }
}

const Wrapper = styled.header`
  position: fixed;
  z-index: ${Z_INDICES.header};
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${-HEIGHT}px;
  left: 0;
  right: 0;
  height: ${HEIGHT}px;
  background: ${COLORS.gray[800]};
`;

const Title = styled.span`
  color: ${props => props.color || COLORS.white};
  font-weight: 600;
  font-size: 1.5rem;
`;

const Date = styled.span`
  display: inline-block;
  padding-left: 1rem;
  color: ${COLORS.gray[300]};
  font-size: 1rem;
`;

export default Header;
