import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Helmet from 'react-helmet';

import { COLORS } from '../constants';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import Footer from '../components/Footer';

import './global';
import './reset.css';
import './fonts.css';

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
`;

const Layout = ({ children }) => (
  <div>
    {children()}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;
