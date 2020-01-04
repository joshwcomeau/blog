import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft';
import { rss } from 'react-icons-kit/feather/rss';
import { Icon } from 'react-icons-kit';

import { COLORS, BREAKPOINTS, Z_INDICES } from '@constants';

import ClickableIcon from '../ClickableIcon';
import InvisibleButton from '../InvisibleButton';

const ICON_SIZE = 22;

class Header extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
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
    const { height, title } = this.props;
    const { isTitleVisible } = this.state;

    // TODO: color should depend on heroStyle.
    // Also, `heroStyle` should be renamed.
    const color = COLORS.pink[500];

    return (
      <Wrapper>
        <InnerWrapper height={height}>
          <IconWrapper size={ICON_SIZE}>
            <ClickableIcon
              href="/"
              icon={arrowLeft}
              iconHover={arrowLeft}
              size={ICON_SIZE}
              color={COLORS.gray[500]}
              colorHover={COLORS.gray[700]}
            />
          </IconWrapper>

          <TextWrapper isVisible={isTitleVisible}>
            <Title
              color={color}
              onClick={this.scrollToTop}
              tabIndex={isTitleVisible ? undefined : -1}
            >
              {title}
            </Title>
          </TextWrapper>

          <IconWrapper size={ICON_SIZE}>
            <RssAnchor href="/rss.xml" target="_blank">
              <Icon icon={rss} size={ICON_SIZE} />
            </RssAnchor>
          </IconWrapper>
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
  justify-content: space-between;
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
  flex: 1;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 700ms;
  text-align: center;
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

const IconWrapper = styled.div`
  position: relative;
  height: ${props => props.size}px;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const RssAnchor = styled.a`
  display: block;
  width: ${ICON_SIZE};
  height: ${ICON_SIZE};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray[500]};

  &:hover {
    color: ${COLORS.gray[700]};
  }
`;

export default Header;
