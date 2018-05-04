import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Helmet from 'react-helmet';

import { COLORS } from '../constants';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

import './global';
import './reset.css';
import './fonts.css';

injectGlobal`
  body {
    line-height: 1.4;
  }

  a {
    color: ${COLORS.blue[500]};
  }

  ::selection {
    background-color: ${COLORS.lime[500]};
  }
`;

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <MaxWidthWrapper>{children()}</MaxWidthWrapper>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
