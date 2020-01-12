import styled from 'styled-components';

const DEFAULT_PADDING = 30;

const getPadding = p => {
  if (typeof p.padding === 'number') {
    return `${p.padding}px`;
  } else if (p.padding) {
    return p.padding;
  } else {
    return `${DEFAULT_PADDING}px`;
  }
};

const Box = styled.div`
  padding: ${getPadding};
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;

export default Box;
