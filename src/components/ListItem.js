import React from 'react';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { arrowRightC } from 'react-icons-kit/ionicons/arrowRightC';
import { COLORS } from '../constants';

const ListItem = ({ children }) => (
  <Wrapper>
    <IconWrapper>
      <IconBase size={16} icon={arrowRightC} />
    </IconWrapper>
    <Children>{children}</Children>
  </Wrapper>
);

const Wrapper = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  padding-right: 16px;
  padding-top: 2px;
  color: ${COLORS.violet[500]};
`;

const Children = styled.div``;

export default ListItem;
