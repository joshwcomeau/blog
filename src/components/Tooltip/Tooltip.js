import React from 'react';
import Tippy from '@tippy.js/react';
import styled, { keyframes } from 'styled-components';
import { followCursor } from 'tippy.js';

import 'tippy.js/dist/tippy.css';
// import 'tippy.js/themes/material.css';
// import 'tippy.js/animations/scale-subtle.css';

const Tooltip = ({ content, children, ...delegated }) => {
  return (
    <StyledTippy
      followCursor={true}
      content={content}
      {...delegated}
      plugins={[followCursor]}
    >
      {children}
    </StyledTippy>
  );
};

const enterKeyframes = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(20px);
  }
`;

const StyledTippy = styled(Tippy)`
  animation: ${enterKeyframes} 400ms both;
  padding: 8px 8px 12px 8px;
  font-size: 18px !important;
  text-align: center;

  &[data-placement^='bottom'] > .tippy-arrow {
    /* border-bottom-color: #fff !important; */
  }
`;

export default Tooltip;
