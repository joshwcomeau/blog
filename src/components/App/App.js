import React, { Fragment } from 'react';
import { injectGlobal } from 'styled-components';
import Helmet from 'react-helmet';

import { COLORS } from '@constants';

import Footer from '../Footer';

import faviconSrc from '../../assets/favicon-swirl.png';

import './global';
import './prism-theme';
import './reset.css';
import './fonts.css';

import '../../polyfills/intersection-observer';

injectGlobal`
  html {
    font-size: 16px;
  }

  body {
    line-height: 1.4;
  }

  a {
    color: ${COLORS.pink[500]};
  }

  ::selection {
    background-color: ${COLORS.lime[500]};
  }

  button:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default ({ children }) => (
  <Fragment>
    <Helmet>
      <link rel="icon" type="image/png" href={`${faviconSrc}?v=1`} />
    </Helmet>

    {children}

    <Footer />
  </Fragment>
);
