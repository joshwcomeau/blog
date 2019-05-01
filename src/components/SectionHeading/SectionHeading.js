import React from 'react';

import { COLORS } from '@constants';

import Heading from '../Heading';

const SectionHeading = ({
  style = {},
  color = COLORS.pink[500],
  ...delegated
}) => <Heading size={3} style={{ ...style, color }} {...delegated} />;

export default SectionHeading;
