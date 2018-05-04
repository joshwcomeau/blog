import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { socialTwitterOutline } from 'react-icons-kit/ionicons/socialTwitterOutline';
import { socialFacebook } from 'react-icons-kit/ionicons/socialFacebook';
import { socialFacebookOutline } from 'react-icons-kit/ionicons/socialFacebookOutline';

import ClickableIcon from './ClickableIcon';
import Spacer from './Spacer';
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
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

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

  handleClickFacebookIcon = () => {
    FB.ui(
      {
        method: 'share',
        href: window.location.href,
      },
      function(response) {
        console.log(response);
      }
    );
  };

  render() {
    const { title } = this.props;
    const { isVisible } = this.state;

    // prettier-ignore
    const twitterMessage =
      `"${title}", by @joshwcomeau.\n\n${window.location.href}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      twitterMessage
    )}`;

    return (
      <Wrapper width={WIDTH} isVisible={isVisible}>
        <ClickableIcon
          size={WIDTH}
          href={twitterUrl}
          icon={socialTwitterOutline}
          iconHover={socialTwitter}
          color={COLORS.gray[500]}
          colorHover={COLORS.gray[700]}
        />
        <Spacer size={20} />
        <ClickableIcon
          size={WIDTH}
          onClick={this.handleClickFacebookIcon}
          icon={socialFacebookOutline}
          iconHover={socialFacebook}
          color={COLORS.gray[500]}
          colorHover={COLORS.gray[700]}
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
    props.isVisible ? 'translate(-300%, 105%)' : 'translate(-350%, 105%)'};
  transition: opacity 500ms ease-out, transform 700ms ease-out;
  will-change: transform;
`;

export default LargeScreenSidebar;
