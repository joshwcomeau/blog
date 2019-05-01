/**
 * Analytics helper component to track when the article has been read
 * (dumb implementation, just sees if the user has scrolled to the
 * "conclusion")
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { finishedReadingPost } from '@helpers/analytics.helpers';

import IntersectionObserver from '../IntersectionObserver';

class TrackRead extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  hasBeenRead = false;

  track = () => {
    const { slug } = this.props;

    // Only makes sense to track read the very first time.
    if (this.hasBeenRead === true) {
      return;
    }

    finishedReadingPost({ slug });
    this.hasBeenRead = true;
  };

  render() {
    const { slug, children } = this.props;

    return (
      <IntersectionObserver
        id={slug}
        onlyFireOn="enter"
        onIntersect={this.track}
      >
        {children}
      </IntersectionObserver>
    );
  }
}

export default TrackRead;
