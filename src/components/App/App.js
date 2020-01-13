import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

import { COLORS } from '@constants';

import Footer from '../Footer';

import runGlobal from './global';
import './reset.css';
import './fonts.css';

import '../../polyfills/intersection-observer';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    line-height: 1.4;
    overflow-x: hidden;
  }

  a {
    color: ${COLORS.pink[500]};
  }

  ::selection {
    background-color: ${COLORS.lime[500]};
  }

  /*
    For unknown reasons, 'InlineCode' isn't being used with MDX.
    Duplicating those styles here.
  */
  p code {
    display: inline-block;
    font-family: 'Fira Mono', monospace;
    font-size: 0.9em;
    letter-spacing: -0.5px;
    padding: 2px 6px;
    background: ${COLORS.gray[200]};
    border-radius: 2px;
  }

  button:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default ({ children }) => {
  React.useEffect(() => {
    runGlobal();
  }, []);

  return (
    <Fragment>
      {children}

      <Footer />

      <GlobalStyles />
    </Fragment>
  );
};
