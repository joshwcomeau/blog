import React from 'react';

import Info from '@components/Info';

const MobileWarning = () => {
  if (typeof window !== 'undefined' && window.innerWidth > 450) {
    return null;
  }

  return (
    <Info type="note">
      This blog post includes interactive code snippets, but I haven't yet found
      a way to make them work well on mobile. As such, the mobile experience is
      kinda crummy :(
      <br />
      <br />
      If you're able to, I'd highly recommend checking this out on a computer.
    </Info>
  );
};

export default MobileWarning;
