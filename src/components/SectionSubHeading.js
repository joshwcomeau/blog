import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../constants';

import Heading from './Heading';

const SectionSubHeading = ({
  style = {},
  color = COLORS.purple[700],
  ...delegated
}) => <Heading size={4} style={{ ...style, color }} {...delegated} />;

export default SectionSubHeading;
