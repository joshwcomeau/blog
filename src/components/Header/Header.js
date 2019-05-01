import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { iosHome } from 'react-icons-kit/ionicons/iosHome';
import { iosHomeOutline } from 'react-icons-kit/ionicons/iosHomeOutline';

import { COLORS, BREAKPOINTS, Z_INDICES, SIZES } from '@constants';
import { humanizeDate } from '@helpers/date.helpers';

import ClickableIcon from '../ClickableIcon';
import InvisibleButton from '../InvisibleButton';

class Header extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
    publishedOn: PropTypes.string,
  };

  state = {
    isTitleVisible: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { isTitleVisible } = this.state;
    const currentScrollPosition = window.scrollY;

    if (!isTitleVisible && currentScrollPosition > window.innerHeight * 0.7) {
      this.setState({ isTitleVisible: true });
    } else if (
      isTitleVisible &&
      currentScrollPosition < window.innerHeight * 0.5
    ) {
      this.setState({ isTitleVisible: false });
    }
  };

  scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { height, title, publishedOn } = this.props;
    const { isTitleVisible } = this.state;

    // TODO: color should depend on heroStyle.
    // Also, `heroStyle` should be renamed.
    const color = COLORS.pink[500];

    return (
      <Wrapper>
        <InnerWrapper height={height}>
          <IconWrapper size={SIZES.homeIcon}>
            <ClickableIcon
              href="/"
              icon={iosHomeOutline}
              iconHover={iosHome}
              size={SIZES.homeIcon}
              color={COLORS.gray[500]}
              colorHover={COLORS.gray[700]}
            />
          </IconWrapper>

          <TextWrapper isVisible={isTitleVisible}>
            <Title color={color} onClick={this.scrollToTop}>
              {title}
            </Title>
            <Date>{humanizeDate(publishedOn)}</Date>
          </TextWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.header`
  position: fixed;
  z-index: ${Z_INDICES.header};
  top: 0px;
  left: 0px;
  right: 0px;
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
  top: 0px;
  left: 10px;
  right: 10px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray[500]};
  background: ${COLORS.white};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);

  @media (orientation: portrait) {
    left: 0;
    right: 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 700ms;
`;

const Title = styled(InvisibleButton)`
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
    max-width: calc(100vw - 55px - 55px);
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
  padding-left: 25px;
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
