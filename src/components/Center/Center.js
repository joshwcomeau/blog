import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${p => (p.padded ? 40 : 0)}px;
`;
