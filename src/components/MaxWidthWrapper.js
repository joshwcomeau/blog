import styled from 'styled-components';

import { BREAKPOINTS, BREAKPOINT_SIZES, READING_WIDTH } from '../constants';
import { getDeviceType } from '../helpers/responsive.helpers';

const getPadding = ({ paddingOn }) => {
  if (paddingOn === 'none') {
    return 0;
  }

  const deviceType = getDeviceType();

  if (deviceType === 'mobile' && paddingOn === 'desktop') {
    return 0;
  }

  if (deviceType === 'desktop' && paddingOn === 'mobile') {
    return 0;
  }

  return deviceType === 'mobile' ? '1rem' : '2rem';
};

const MaxWidthWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${props => props.maxWidth || `${READING_WIDTH}px`};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${getPadding};
  padding-right: ${getPadding};
`;

export default MaxWidthWrapper;
