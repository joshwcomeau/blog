import React from 'react';

import Info from '@components/Info';

const MobileWarning = () => {
  const isSSR = typeof window === 'undefined';

  if (isSSR || window.innerWidth > 450) {
    return null;
  }

  return (
    <Info type="note">
      Hi there! It seems like you're on a mobile device. Unfortunately, some of
      the interactives on this page won't work so well with a touch screen.
      <br />
      <br />
      I hope someday to improve this experience (and{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/joshwcomeau/blog"
      >
        PRs are welcome!
      </a>), but for now, I highly recommend switching to a computer. You'll get
      more out of the article!
    </Info>
  );
};

export default MobileWarning;
