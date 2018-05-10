import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { socialTwitterOutline } from 'react-icons-kit/ionicons/socialTwitterOutline';
import { socialFacebook } from 'react-icons-kit/ionicons/socialFacebook';
import { socialFacebookOutline } from 'react-icons-kit/ionicons/socialFacebookOutline';
import { ic_format_size } from 'react-icons-kit/md/ic_format_size';

import { COLORS, BREAKPOINT_SIZES } from '../constants';
import { changeFontSize } from '../helpers/theme.helpers';

import ClickableIcon from './ClickableIcon';
import Spacer from './Spacer';

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

  handleTextZoomLeftClick = ev => {
    changeFontSize('increment');
  };

  handleTextZoomRightClick = ev => {
    ev.preventDefault();

    changeFontSize('decrement');
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

    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;

    return (
      <Wrapper width={WIDTH} isVisible={isVisible}>
        <ClickableIcon
          external
          size={WIDTH}
          href={twitterUrl}
          icon={socialTwitterOutline}
          iconHover={socialTwitter}
          color={COLORS.gray[500]}
          colorHover={COLORS.gray[700]}
        />
        <Spacer size={20} />
        <ClickableIcon
          external
          size={WIDTH}
          href={facebookUrl}
          target="_blank"
          icon={socialFacebookOutline}
          iconHover={socialFacebook}
          color={COLORS.gray[500]}
          colorHover={COLORS.gray[700]}
        />

        <Spacer size={20} />
        <Divider />
        <Spacer size={20} />

        <ClickableIcon
          size={WIDTH}
          onClick={this.handleTextZoomLeftClick}
          onContextMenu={this.handleTextZoomRightClick}
          icon={ic_format_size}
          iconHover={ic_format_size}
          color={COLORS.gray[500]}
          colorHover={COLORS.gray[700]}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: sticky;
  top: 0px;
  margin-top: -175px;
  left: ${props => props.width * -1}px;
  width: ${props => props.width}px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props =>
    props.isVisible ? 'translate(-325%, 105%)' : 'translate(-375%, 105%)'};
  transition: opacity 500ms ease-out, transform 700ms ease-out;
  will-change: transform;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

export default LargeScreenSidebar;
