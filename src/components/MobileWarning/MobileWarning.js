import React from 'react';

import Info from '@components/Info';

const MobileWarning = () => {
  if (typeof window !== 'undefined' && window.innerWidth > 450) {
    return null;
  }

  return (
    <Info type="note">
      This page hasn't really been optimized for mobile - it encourages
      tinkering with code snippets which don't work well on smaller screens.
      <br />
      <br />
      If you're able to, I'd highly recommend checking this out on a computer.
    </Info>
  );
};

export default MobileWarning;
