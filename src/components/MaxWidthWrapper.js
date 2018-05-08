import styled from 'styled-components';

import { BREAKPOINTS, BREAKPOINT_SIZES, READING_WIDTH } from '../constants';
import { getDeviceType } from '../helpers/responsive.helpers';

const getPadding = () => {
  const deviceType = getDeviceType();

  if (deviceType === 'mobile' && paddingOn === 'desktop') {
    return 0;
  }

  if (deviceType === 'desktop' && paddingOn === 'mobile') {
    return 0;
  }

  return deviceType === 'mobile' ? '16px' : '32px';
};

const MaxWidthWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${props => props.maxWidth || `${READING_WIDTH}px`};
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${BREAKPOINTS.sm} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default MaxWidthWrapper;
