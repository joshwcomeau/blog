import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

export default props => {
  if (props.gradientSteps) {
    const gradient = props.gradientSteps.join(', ');
    return <GradientTitle {...props} gradient={gradient} />;
  }
};

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: -0.25rem;
`;

const GradientTitle = styled(Title)`
  background: -webkit-linear-gradient(${props => props.gradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ClippedTitle = styled(Title)`
  background-image: url(${props => props.image});
  background-size: cover;
  background-clip: padding-box;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;
