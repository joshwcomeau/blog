import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { BlockMath, InlineMath } from 'react-katex';

import 'katex/dist/katex.min.css';
import { COLORS } from '../constants';

const Latex = ({ block = false, children }) => (
  <Wrapper block={block}>
    {block ? <BlockMath math={children} /> : <InlineMath math={children} />}
  </Wrapper>
);

const Wrapper = styled.span`
  display: ${props => (props.block ? 'block' : 'inline')};
  margin: ${props => (props.block ? '42px auto' : '0')};
  font-size: 21px;
  color: ${COLORS.violet[700]};
`;

export default Latex;
