import React, { Component } from 'react';
import styled from 'styled-components';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { socialTwitterOutline } from 'react-icons-kit/ionicons/socialTwitterOutline';

import ClickableIcon from './ClickableIcon';
import { COLORS, BREAKPOINT_SIZES } from '../constants';

const WIDTH = 32;

// TODO: The visibility threshold should match the header. This should ergo
// be a shared constant (maybe on the blog post, or maybe associated with
// the header?)
const SCROLL_THRESHOLD = 66;

const isLargeEnoughScreen = () => window.innerWidth >= BREAKPOINT_SIZES.lg;

const isScrolledFarEnough = () =>
  window.scrollY / window.innerHeight * 100 > SCROLL_THRESHOLD;

class LargeScreenSidebar extends Component {
  state = {
    isVisible: isLargeEnoughScreen() && isScrolledFarEnough(),
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const largeEnough = isLargeEnoughScreen();

    if (this.state.isVisible && !largeEnough) {
      this.setState({ isVisible: false });
    } else if (!this.state.isVisible && largeEnough) {
      this.setState({ isVisible: true });
    }
  };

  handleScroll = () => {
    const farDownEnough = isScrolledFarEnough();

    if (this.state.isVisible && !farDownEnough) {
      this.setState({ isVisible: false });
    } else if (!this.state.isVisible && farDownEnough) {
      this.setState({ isVisible: true });
    }
  };

  render() {
    const { isVisible } = this.state;

    return (
      <Wrapper width={WIDTH} isVisible={isVisible}>
        <ClickableIcon
          size={WIDTH}
          href="https://twitter.com/intent/tweet?text=Hello%20World"
          icon={socialTwitterOutline}
          iconHover={socialTwitter}
          color={COLORS.gray[600]}
          colorHover={COLORS.gray[800]}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: sticky;
  top: 100px;
  left: ${props => props.width * -1}px;
  width: ${props => props.width}px;
  transform: translate(-300%, 110%);
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props =>
    props.isVisible ? 'translate(-300%, 110%)' : 'translate(-350%, 110%)'};
  transition: opacity 500ms ease-out, transform 700ms ease-out;
  will-change: transform;
`;

export default LargeScreenSidebar;
