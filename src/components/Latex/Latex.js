import React from 'react';
import styled from 'styled-components';
import { BlockMath, InlineMath } from 'react-katex';

import { COLORS } from '@constants';

import 'katex/dist/katex.min.css';

const Latex = ({ block = false, children }) => (
  <Wrapper block={block}>
    {block ? <BlockMath math={children} /> : <InlineMath math={children} />}
  </Wrapper>
);

const Wrapper = styled.span`
  display: ${props => (props.block ? 'block' : 'inline')};
  margin: ${props => (props.block ? '42px auto' : '0')};
  font-size: 21px;
  color: ${COLORS.gray[600]};
`;

export default Latex;
