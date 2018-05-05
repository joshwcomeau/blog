import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { iosHome } from 'react-icons-kit/ionicons/iosHome';
import { iosHomeOutline } from 'react-icons-kit/ionicons/iosHomeOutline';
import { Motion, spring } from 'react-motion';

import { COLORS, BREAKPOINTS, Z_INDICES } from '../constants';
import { humanizeDate } from '../helpers/date.helpers';
import { clamp } from '../utils';

import ClickableIcon from './ClickableIcon';

const HEIGHT = 50;
const BUFFER = 75;

class Header extends PureComponent {
  state = {
    scrolledToTop: true,
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
    const currentScrollPosition = window.scrollY;

    const scrolledToTop = currentScrollPosition === 0;
    if (scrolledToTop && !this.state.scrolledToTop) {
      this.setState({ scrolledToTop, translateAmount: 0 });
      this.scrollPosition = currentScrollPosition;
      this.lockedScrollPosition = 0;
      return;
    }

    const currentScrollDirection =
      currentScrollPosition > this.scrollPosition ? 'down' : 'up';

    if (this.scrollDirection === 'down' && currentScrollDirection === 'up') {
      // We don't want to allow the locked position to be changed if we're
      // in the middle of showing/hiding the header; this causes an odd glitchy
      // effect.
      const isMidReveal = this.state.translateAmount !== 0;

      if (!isMidReveal) {
        this.lockedScrollPosition = this.scrollPosition;
      }
    } else if (
      this.scrollDirection === 'up' &&
      currentScrollDirection === 'down'
    ) {
      const isMidReveal = this.state.translateAmount !== HEIGHT + BUFFER;

      if (!isMidReveal) {
        this.lockedScrollPosition = this.scrollPosition + HEIGHT + BUFFER;
      }
    }

    const translateAmount = clamp(
      this.lockedScrollPosition - currentScrollPosition,
      0,
      HEIGHT + BUFFER
    );

    this.scrollDirection = currentScrollDirection;
    this.scrollPosition = currentScrollPosition;

    if (translateAmount !== this.state.translateAmount) {
      this.setState({ translateAmount, scrolledToTop: false });
    }
  };

  render() {
    const { title, publishedOn, heroStyle } = this.props;
    const { translateAmount, scrolledToTop } = this.state;

    const HOME_ICON_SIZE = 28;

    // TODO: color should depend on heroStyle.
    // Also, `heroStyle` should be renamed.
    const color = COLORS.pink[300];

    const springSettings = {
      stiffness: 170,
      damping: 30,
    };

    return (
      <Motion
        defaultStyle={{ translateAmount: 0 }}
        style={{ translateAmount: spring(translateAmount, springSettings) }}
      >
        {({ translateAmount }) => (
          <Wrapper
            style={{
              transform: `translateY(${translateAmount}px)`,
              opacity: scrolledToTop ? 0 : 1,
              transition: scrolledToTop ? 'opacity 500ms' : '',
              pointerEvents: scrolledToTop ? 'none' : 'auto',
            }}
          >
            <InnerWrapper>
              <IconWrapper size={HOME_ICON_SIZE}>
                <ClickableIcon
                  href="/"
                  icon={iosHomeOutline}
                  iconHover={iosHome}
                  size={HOME_ICON_SIZE}
                  color={COLORS.gray[500]}
                  colorHover={COLORS.gray[700]}
                />
              </IconWrapper>

              <TextWrapper>
                <Title color={color}>{title}</Title>
                <Date>{humanizeDate(publishedOn)}</Date>
              </TextWrapper>
            </InnerWrapper>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

const Wrapper = styled.header`
  position: fixed;
  z-index: ${Z_INDICES.header};
  top: ${-HEIGHT - BUFFER}px;
  left: 0px;
  right: 0px;
  height: ${HEIGHT + 10}px;
  transition: opacity 250ms;
  will-change: transform;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  height: ${HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray[800]};
  background: ${COLORS.white};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.span`
  display: inline-block;
  color: ${props => props.color || COLORS.white};
  font-weight: 600;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${BREAKPOINTS.md} {
    /* Subtract roughly the amount of space needed for the home icon on the
    left, and duplicate it for the right side to preserve balance */
    max-width: calc(100vw - 68px - 68px);
  }

  @media ${BREAKPOINTS.mdMin} {
    /* Subtract roughly the amount of space needed for the home icon on the
    left, and duplicate it for the right side to preserve balance */
    max-width: 600px;
  }

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[900]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
`;

const Date = styled.span`
  display: inline-block;
  padding-left: 1rem;
  font-size: 1rem;
  /* HACK: Get the date and title to all line up along a baseline */
  transform: translateY(-2px);

  @media ${BREAKPOINTS.md} {
    display: none;
  }

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[900]};
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: 12px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export default Header;
